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

  private static _defaultConfig: ActiveRecordConfig = {
    identifier: 'id',
    tableName: 'ActiveRecord',
    queryClass: ActiveQuery
  };

  private static _config: { [model: string]: ActiveRecordConfig; } = {};
  protected static _db: { [model: string]: any; } = {};
  private static _initialized: { [model: string]: boolean; } = {};

  constructor(values?) {
    super(values);
    this._class.init();
    this._initRelations();
  }

  static get db() {
    return this._db[this.config.tableName];
  }

  get db() {
    return this._class.db[this._class.config.tableName];
  }

  protected static _dbInit(): Promise<boolean> {
    this.initialized(this.config.tableName);
    return Promise.resolve(true);
  }

  public static initialized(model: string) {
    this._initialized[model] = true;
  }

  public static get config() {
    return this._config[this._tableName];
  }

  public static set config(config) {
    Object.keys(config).forEach((key) => {
      this._config[key] = config[key];
    });
  }

  public static async init() {
    if (this._initialized[this._tableName]) {
      return;
    }

    this._config[this._tableName] = {
      identifier: this._identifier || this._defaultConfig.identifier,
      tableName: this._tableName || this._defaultConfig.tableName,
      queryClass: this._queryClass || this._defaultConfig.queryClass
    };

    return this._dbInit();
  }

  private _initRelations() {
    this._class._relations.forEach((relation) => relation.init(this));
  }

  public static addRelation(relation: ActiveRecordRelation) {
    this._relations.push(relation);
  }

  /* Easy access getter */

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

  public static async save(objects): Promise<any[]> {
    throw new Error('Model.save() needs to be set!');
  };
}
