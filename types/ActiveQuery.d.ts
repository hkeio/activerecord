import { ActiveRecord } from './ActiveRecord';
export declare abstract class ActiveQuery {
    private _db;
    private _model;
    protected _params: {
        fields: string[];
        limit: {
            start: number;
            end: number;
        };
        sort: string[];
        where: any;
    };
    constructor(model: typeof ActiveRecord);
    readonly params: {
        fields: string[];
        limit: {
            start: number;
            end: number;
        };
        sort: string[];
        where: any;
    };
    readonly db: any;
    readonly model: any;
    fields(param: string[]): this;
    sort(param: string[]): this;
    limit(start?: number, end?: any): this;
    where(condition?: any): this;
    abstract one(map?: boolean): Promise<any>;
    abstract all(map?: boolean): Promise<any[]>;
}
