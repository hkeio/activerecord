import { equal, deepEqual } from 'assert';

import { ActiveQuery, ActiveRecord, ActiveRecordRelation, ModelAttribute } from './../src';

export class TestQuery extends ActiveQuery {
  one() { return Promise.resolve(); }
  all() { return Promise.resolve([]); }
}

export class TestRecord extends ActiveRecord {
  save() {
    this.id = Math.random();
    return Promise.resolve(this);
  }
  static async save(objects) {
    let result = [];
    for (let object of objects) {
      if (!(object instanceof this)) {
        object = new this(object);
      }
      result.push(await object.save());
    }
    return result;
  }
}

class Boo extends TestRecord {
  static _tableName = 'Boo';
}
class Bar extends TestRecord {
  boo: string;
  static _tableName = 'Bar';

  public static _attributes: ModelAttribute[] = [
    new ModelAttribute('boo')
  ];
}
class Foo_Bar extends TestRecord {
  static _tableName = 'Foo_Bar';
}
class FooChild extends TestRecord {
  static _tableName = 'FooChild';
}
class Foo extends TestRecord {
  foo?: string;
  goo?: number;

  bars?: Bar[];
  getBars?: () => Promise<ActiveQuery>;
  addBar?: (object: any | Bar) => Promise<void>;
  addBars?: (pbjects: any[] | Bar[]) => Promise<void>;

  fooChildrens?: FooChild[];
  getFooChildrens?: () => Promise<ActiveQuery>;
  addFooChildren?: (object: any | FooChild) => Promise<void>;
  addFooChildrens?: (objects: any[] | FooChild[]) => Promise<void>;

  boo?: Boo;
  boo_id?: string;
  setBoo?: (object: any | Boo) => Promise<void>;

  static _tableName = 'Foo';
  static _queryClass = TestQuery;

  public static _attributes: ModelAttribute[] = [
    new ModelAttribute('foo'),
    new ModelAttribute('goo'),
  ];

  protected static _relations: ActiveRecordRelation[] = [
    ActiveRecordRelation.manyToMany('bars', Bar, Foo_Bar, 'foo_id', 'bar_id'),
    ActiveRecordRelation.hasMany('fooChildren', FooChild, 'foo_id'),
    ActiveRecordRelation.hasOne('boo', Boo, 'boo_id')
  ];
}

let values = {
  foo: "bar",
  goo: 1
};
let attributes = {
  foo: "bar",
  goo: 1,
  boo_id: null
}
let foo = new Foo(values);

describe('ActiveRecord', () => {

  it('should be instance of ActiveRecord', () => {

    // static methods
    equal(typeof Foo.find, 'function');
    equal(typeof Foo.findOne, 'function');
    equal(typeof Foo.findAll, 'function');

    // static getter
    equal(Foo.config.identifier, 'id');
    equal(Foo.config.tableName, 'Foo');
    equal(Foo.config.queryClass.prototype.constructor.name, TestQuery.prototype.constructor.name);
    // check for existance of db
    equal(Foo.db !== undefined, true);

    // instance
    equal(foo instanceof Foo, true);
    equal(foo.isNewRecord, true);
    deepEqual(foo.attributes, attributes);

    // methods
    equal(typeof foo.save, 'function');

    // attributes
    equal(foo.hasOwnProperty('foo'), true);
    equal(foo.hasOwnProperty('goo'), true);
  });
});

describe('ActiveQuery', () => {

  it('should be instance of ActiveQuery', () => {
    let query = Foo.find()
      .fields(['goo'])
      .sort(['goo'])
      .limit(1, 1)
      .where({ $gt: { goo: 1 } });
    equal(query instanceof TestQuery, true);
    equal(typeof query.fields, 'function');
    equal(typeof query.sort, 'function');
    equal(typeof query.limit, 'function');
    equal(typeof query.where, 'function');
    equal(typeof query.one, 'function');
    equal(typeof query.all, 'function');

    deepEqual(query.params, {
      fields: ['goo'],
      limit: { start: 1, end: 1 },
      sort: ['goo'],
      where: { '$gt': { goo: 1 } }
    });
  });

});

describe('ActiveRecordRelation', () => {

  it('should create methods and properties', async () => {
    // many to many relation
    equal(foo.bars instanceof Promise, true);
    equal(foo.getBars() instanceof Promise, true);
    equal(typeof foo.getBars, 'function');
    equal(typeof foo.addBar, 'function');
    equal(typeof foo.addBars, 'function');

    // has many relation
    equal(foo.fooChildrens instanceof Promise, true);
    equal(foo.getFooChildrens() instanceof Promise, true);
    equal(typeof foo.getFooChildrens, 'function');
    equal(typeof foo.addFooChildren, 'function');
    equal(typeof foo.addFooChildrens, 'function');

    // has one relations
    equal(foo.hasOwnProperty('boo'), true);
    equal(typeof foo.setBoo, 'function');

    let bar = new Bar({});
    console.log('a', await bar.save());
    console.log('b', await foo.addBar(bar));
    console.log('c', await foo.addBar({}));
    console.log('d', await foo.addBar(new Bar({})));
    const bars = await foo.bars;
    equal(bars.length, 3);
  });

});
