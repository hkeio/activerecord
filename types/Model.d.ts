export declare class ModelAttribute {
    name: string;
    type: string;
    constructor(name: any, type?: string);
    init(model: Model): void;
}
export declare class Model {
    protected static _attributes: ModelAttribute[];
    protected _values: any;
    protected _class: any;
    constructor(values?: any, attributes?: ModelAttribute[]);
    static addAttributes(attributes: ModelAttribute[]): void;
    static readonly className: string;
    readonly className: string;
    private _initAttributes();
    static defineAttributes(attributes: ModelAttribute[]): void;
    setAttributes(values: any): void;
    attributes: any;
    setAttribute(attribute: string, value: any): void;
    getAttribute(attribute: string): any;
}
