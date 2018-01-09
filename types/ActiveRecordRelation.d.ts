import { ModelAttribute } from './Model';
import { ActiveRecord } from './ActiveRecord';
export declare class ActiveRecordRelation {
    private _child;
    private _foreignKey;
    private _intermediate;
    private _key;
    private _label;
    private _property;
    private _type;
    constructor(values?: any, attributes?: ModelAttribute[]);
    private _formatLabel(string);
    static hasOne(label: string, child: typeof ActiveRecord, property: string): ActiveRecordRelation;
    static hasMany(label: string, child: typeof ActiveRecord, property: string): ActiveRecordRelation;
    static manyToMany(label: string, child: typeof ActiveRecord, intermediate: typeof ActiveRecord, key: string, foreignKey: string): ActiveRecordRelation;
    init(model: ActiveRecord): void;
    private _initHasOne(model, condition);
    private _initHasMany(model, condition);
    private _initManyToMany(model, condition);
}
