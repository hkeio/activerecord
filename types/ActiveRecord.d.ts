import { ActiveQuery } from './ActiveQuery';
import { Model } from './Model';
import { ActiveRecordRelation } from './ActiveRecordRelation';
export interface ActiveRecordConfig {
    identifier: string;
    tableName: string;
    queryClass: any;
}
export declare abstract class ActiveRecord extends Model {
    protected static _relations: ActiveRecordRelation[];
    protected static _identifier: string;
    protected static _tableName: string;
    protected static _queryClass: any;
    private static _config;
    protected static _db: {
        [model: string]: any;
    };
    private static _initialized;
    constructor(values?: any);
    static readonly db: {
        [model: string]: any;
    };
    readonly db: any;
    protected static _dbInit(): Promise<boolean>;
    static initialized(model: string): void;
    static config: ActiveRecordConfig;
    static init(): void;
    private _initRelations();
    readonly class: any;
    id: string | number;
    readonly isNewRecord: boolean;
    static find(): ActiveQuery & any;
    static findOne(condition?: any): Promise<ActiveRecord & any>;
    static findAll(condition?: {}): Promise<ActiveRecord[] & any[]>;
    abstract save(): Promise<this>;
}
