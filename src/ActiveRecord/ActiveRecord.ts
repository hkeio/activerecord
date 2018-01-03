import { ActiveQuery } from './../ActiveQuery/ActiveQuery';
import { Model, ModelAttribute } from './../Model/Model';
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
    this._class.init();
    this._initRelations();
  }

  static get db() {
    return this._db;
  }

  get db() {
    return this.class.db[this.class.config.tableName];
  }

  protected static _dbInit() {
    this.initialized(this.config.tableName);
    return true;
  }

  public static initialized(model: string) {
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

  get id(): string {
    return this.getAttribute(this._class._config.identifier);
  }

  set id(value: string) {
    throw new Error('Property id cannot be set!');
  }

  get isNewRecord(): boolean {
    return !this.id;
  }

  /* Querying methods */

  public static find() {
    this.init();
    return new this.config.queryClass(this);
  }

  public static findOne(condition: any = {}): ActiveRecord & any {
    this.init();

    // condition is id
    if (typeof condition === 'string') {
      return this.find()
        .where({ '_id': condition })
        .one();
    }

    return this.find()
      .where(condition)
      .one();
  }

  public static findAll(condition = {}): ActiveRecord[] & any[] {
    return this.find()
      .where(condition)
      .all();
  }

  public abstract save(): any;
}
