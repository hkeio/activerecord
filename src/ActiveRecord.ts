import { ActiveQuery } from './ActiveQuery';
import { Model, ModelAttribute } from './Model';
import { ActiveRecordRelation } from './ActiveRecordRelation';

export interface ActiveRecordConfig {
  identifier: string;
  tableName: string;
  queryClass: any;
};

export abstract class ActiveRecord extends Model {

  protected static _relations: ActiveRecordRelation[] = [];

  protected static _identifier: string;
  protected static _tableName: string;
  protected static _queryClass: any;

  private static _config: ActiveRecordConfig = {
    identifier: 'id',
    tableName: 'ActiveRecord',
    queryClass: ActiveQuery
  };

  protected static _db: { [model: string]: any; } = {};
  private static _initialized: { [model: string]: boolean; } = {};

  constructor(values?) {
    super(values);
    // console.log('zz', this);
    this._class.init();
    this._initRelations();
  }

  static get db() {
    return this._db;
  }

  get db() {
    return this.class.db[this.class.config.tableName];
  }

  protected static _dbInit(): Promise<boolean> {
    this.initialized(this.config.tableName);
    return Promise.resolve(true);
  }

  public static initialized(model: string) {
    // console.log('a', model);
    this._initialized[model] = true;
  }

  public static get config() {
    return this._config;
  }

  public static set config(config) {
    Object.keys(config).forEach((key) => {
      this._config[key] = config[key];
    });
  }

  public static init() {
    // console.log('aa', this.config.tableName);
    // console.log('ab', this._initialized);
    if (this._initialized[this.config.tableName]) {
      return;
    }

    this._config.identifier = this._identifier || this._config.identifier;
    this._config.tableName = this._tableName || this._config.tableName;
    this._config.queryClass = this._queryClass || this._config.queryClass;

    this._dbInit();
  }

  private _initRelations() {
    this._class._relations.forEach((relation) => relation.init(this));
  }

  /* Easy access getter */

  get class() {
    return this._class;
  }

  get id(): string | number {
    return this.getAttribute(this._class.config.identifier);
  }

  set id(value: string | number) {
    if (!this.id) {
      this.setAttribute(this._class.config.identifier, value);
    }
  }

  get isNewRecord(): boolean {
    return !this.id;
  }

  /* Querying methods */

  public static find(): ActiveQuery & any {
    this.init();
    return new this.config.queryClass(this);
  }

  public static findOne(condition: any = {}): Promise<ActiveRecord & any> {
    this.init();

    // condition is id
    if (typeof condition === 'string') {
      let idCondition = {};
      idCondition[this.config.identifier] = condition;
      return this.find()
        .where(idCondition)
        .one();
    }

    return this.find()
      .where(condition)
      .one();
  }

  public static findAll(condition = {}): Promise<ActiveRecord[] & any[]> {
    return this.find()
      .where(condition)
      .all();
  }

  public abstract save(): Promise<this>;

  // @initDb()
  public static async save(objects): Promise<any[]> {
    console.log('qwe');
    throw new Error('Model.save() needs to be set!');
  };
}

// function initDb() {
//   return function (target: typeof ActiveRecord, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log('init ' + target.name)
//     target.init();
//   }
// }
