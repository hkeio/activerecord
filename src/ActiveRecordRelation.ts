import { Model, ModelAttribute } from './Model';
import { ActiveRecord } from './ActiveRecord';

const ActiveRecordRelationType = {
  HasOne: 1,
  HasMany: 2,
  ManyToMany: 3
};

interface Label {
  original: string;
  singular: string;
  plural: string;
  capitalizedSingular: string;
  capitalizedPlural: string;
}

export class ActiveRecordRelation extends Model {

  private _child: typeof ActiveRecord & any;
  private _foreignKey: string;
  private _intermediate: typeof ActiveRecord & any;
  private _key: string;
  private _label: Label;
  private _property: string;
  private _type: number;

  protected static _attributes: ModelAttribute[] = [
    new ModelAttribute('_child', typeof ActiveRecord),
    new ModelAttribute('_foreignKey'),
    new ModelAttribute('_intermediate', typeof ActiveRecord),
    new ModelAttribute('_key'),
    new ModelAttribute('_label'),
    new ModelAttribute('_property'),
    new ModelAttribute('_type', 'number'),
  ];

  constructor(values?: any, attributes?: ModelAttribute[]) {
    super(values, attributes);
    this._label = this._formatLabel(values._label);
  }

  private _formatLabel(string: string): Label {
    let singular = string[string.length - 1] === 's' ? string.substr(0, string.length - 1) : string;
    let plural = string[string.length - 1] === 's' ? string : string + 's';
    return {
      original: string,
      singular: singular,
      plural: plural,
      capitalizedSingular: singular[0].toUpperCase() + singular.slice(1),
      capitalizedPlural: plural[0].toUpperCase() + plural.slice(1)
    }
  }

  public static hasOne(label: string, child: typeof ActiveRecord, property: string) {
    return new this({
      _child: child,
      _label: label,
      _property: property,
      _type: ActiveRecordRelationType.HasOne
    });
  }

  public static hasMany(label: string, child: typeof ActiveRecord, property: string) {
    return new this({
      _child: child,
      _label: label,
      _property: property,
      _type: ActiveRecordRelationType.HasMany
    });
  }

  public static manyToMany(label: string, child: typeof ActiveRecord, intermediate: typeof ActiveRecord, key: string, foreignKey: string) {
    return new this({
      _child: child,
      _foreignKey: foreignKey,
      _intermediate: intermediate,
      _key: key,
      _label: label,
      _type: ActiveRecordRelationType.ManyToMany
    });
  }

  public init(model: ActiveRecord) {
    let condition = {};
    if (this._type === ActiveRecordRelationType.HasOne) {
      this._initHasOne(model, condition);
    } else if (this._type === ActiveRecordRelationType.HasMany) {
      this._initHasMany(model, condition);
    } else if (this._type === ActiveRecordRelationType.ManyToMany) {
      this._initManyToMany(model, condition);
    }
  }

  private _initHasOne(model, condition) {
    // add property to class
    model.class.addAttributes([new ModelAttribute(this._property, 'string')]);
    model.setAttribute(this._property, null);

    Object.defineProperty(model, this._label.original, {
      get: () => this._child.findOne(model[this._property]),
    });

    // add `setChild()` method
    model['set' + this._label.capitalizedSingular] = async (object: any) => {
      if (!(object instanceof this._child)) {
        object = new this._child(object);
      }
      await object.save();
      model[this._property] = object.getAttribute(this._child.config.identifier);
      return object;
    }
  }

  private _initHasMany(model, condition) {
    // add foreign property to child class
    this._child.addAttributes([new ModelAttribute(this._property, 'foreignKey')]);

    // set getter `child` property
    Object.defineProperty(model, this._label.plural, {
      get: async () => {
        await this._child.init();
        condition[this._property] = model.getAttribute(this._child.config.identifier);
        return await new model.class.config.queryClass(this._child).where(condition).all();
      },
    });

    // add `getChild()` method
    model['get' + this._label.capitalizedPlural] = async () => {
      condition[this._property] = model.getAttribute(this._child.config.identifier);
      return await new model.class.config.queryClass(this._child).where(condition);
    };

    // add `addChild()` method
    model['add' + this._label.capitalizedSingular] = async (object: any) => {
      const res = await model['add' + this._label.capitalizedPlural]([object]);
      return res[0];
    }

    // add `addChildren()` method
    model['add' + this._label.capitalizedPlural] = async (objects: any[]) => {
      if (!objects.length) {
        return;
      }

      // set parent model id in children models
      objects = objects.map((object) => {
        object[this._property] = model.getAttribute(this._child.config.identifier);
        return object;
      });

      // save all objects
      return await this._child.save(objects);
    }
  }

  private _initManyToMany(model, condition) {
    // add foreign property to intermediate class
    this._intermediate.addAttributes([new ModelAttribute(this._foreignKey, 'foreignKey')]);

    // set getter `child` property
    Object.defineProperty(model, this._label.plural, {
      get: async () => {
        await this._child.init();
        condition[this._key] = model.getAttribute(model.class.config.identifier);
        const res = await this._intermediate.find()
          .where(condition)
          .fields([this._foreignKey])
          .all(false);
        if (!res.length) {
          return [];
        }

        let ids = res.map((doc) => doc.getAttribute(this._foreignKey)).filter(Boolean);
        let queryCondition = {};
        queryCondition[this._child.config.identifier] = { $in: ids };
        return await new model.class.config.queryClass(this._child)
          .where(queryCondition)
          .all();
      }
    });

    // add `getChild()` method
    model['get' + this._label.capitalizedPlural] = async () => {
      condition[this._key] = model.getAttribute(this._child.config.identifier);
      const res = await this._intermediate.find()
        .where(condition)
        .fields([this._foreignKey])
        .all(false);
      if (!res.length) {
        return [];
      }

      let ids = res.map((doc) => doc.getAttribute(this._foreignKey)).filter(Boolean);
      let queryCondition = {};
      queryCondition[this._child.config.identifier] = { $in: ids };
      return await new model.class.config.queryClass(this._child)
        .where(queryCondition);
    };

    // add `addChild()` method
    model['add' + this._label.capitalizedSingular] = async (object: any) => {
      const res = await model['add' + this._label.capitalizedPlural]([object]);
      return res[0];
    }

    // add `addChildren()` method
    model['add' + this._label.capitalizedPlural] = async (objects: any[]) => {
      if (!objects.length) {
        return;
      }

      // save all objects
      const savedObjects = await this._child.save(objects);

      let condition = {};
      condition[this._foreignKey] = { $in: savedObjects.map((object) => object.getAttribute(this._child.config.identifier)) };
      const existingRelations = await this._intermediate.findAll(condition);

      for (let object of savedObjects) {
        var found = false;

        if (existingRelations.length) {
          existingRelations.forEach((existing) => {
            found = found || object.getAttribute(this._child.config.identifier) === existing.getAttribute(this._foreignKey);
          });
        }

        if (!found) {
          let data = {};
          data[this._key] = model.getAttribute(this._child.config.identifier);
          data[this._foreignKey] = object.getAttribute(this._child.config.identifier);
          let relation = new this._intermediate(data);
          await relation.save();
        }
      }
      return savedObjects;
    }
  }
}
