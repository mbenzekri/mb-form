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
    static get styles(): import("lit-element").CSSResult[];
    render(): TemplateResult;
    renderItem(nameorindex: string | number): TemplateResult;
    arrayAppend(index?: number): TemplateResult;
    connectedCallback(): void;
    firstUpdated(_changedProperties: any): void;
    update(changedProperties: Map<string, any>): void;
    get label(): any;
    get isItem(): boolean;
    get isProperty(): boolean;
    get input(): HTMLInputElement;
    isRequired(name: string, schema?: Pojo): boolean;
    default(schema: Pojo, required: boolean): any;
    change(): void;
    dropItem(): void;
    get value(): any;
    set value(val: any);
    check(): void;
    abstract renderField(): TemplateResult;
    abstract setValue(value: any): void;
    abstract getValue(): any;
}
//# sourceMappingURL=mb-form-field.d.ts.map