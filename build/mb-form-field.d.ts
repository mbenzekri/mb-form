import { LitElement, TemplateResult } from "lit-element";
export declare type Pojo = {
    [key: string]: any;
};
export declare function isbasic(name: any): boolean;
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export declare abstract class MBFormField extends LitElement {
    schema: Pojo;
    data: Pojo;
    name: string;
    index: number;
    required: boolean;
    valid: boolean;
    message: string;
    constructor(schema: Pojo, data: any);
    abstract renderField(): TemplateResult;
    abstract setValue(value: any): void;
    abstract getValue(): any;
    get plainValue(): any;
    get value(): any;
    set value(val: any);
    /**
     * return label for this field
     */
    get label(): any;
    get isItem(): boolean;
    get isProperty(): boolean;
    get input(): HTMLInputElement;
    focus(): void;
    static get styles(): import("lit-element").CSSResult[];
    /**
     * render method for this field component (call renderField abstract rendering method)
     */
    render(): TemplateResult;
    /**
     * render method for label
     */
    get renderLabel(): TemplateResult;
    /**
     * render an item of this field (item is a property of object or element of array)
     * used by composed fields (array or object)
     * @param nameorindex
     */
    renderItem(nameorindex: string | number): TemplateResult;
    firstUpdated(_changedProperties: any): void;
    /**
     * return an abstract for a given schema,value pair
     */
    abstract(schema: Pojo, value: any): string;
    default(schema: Pojo): any;
    change(): void;
    dropItem(): void;
    isRequired(name: string, schema?: Pojo): boolean;
    check(): void;
}
//# sourceMappingURL=mb-form-field.d.ts.map