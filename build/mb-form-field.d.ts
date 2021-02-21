import { LitElement, TemplateResult } from "lit-element";
export declare type Pojo = {
    [key: string]: any;
};
export declare type JSONSchema = Pojo;
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare abstract class MBFormField extends LitElement {
    schema: JSONSchema;
    data: Pojo;
    name: string;
    index: number;
    required: boolean;
    valid: boolean;
    constructor(schema: Pojo, data: any);
    render(): TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    connectedCallback(): void;
    firstUpdated(_changedProperties: any): void;
    update(changedProperties: Map<string, any>): void;
    get label(): any;
    get isItem(): boolean;
    get isProperty(): boolean;
    get input(): HTMLInputElement;
    get message(): string;
    get validitymap(): {
        'is-invalid': boolean;
        'is-valid': boolean;
    };
    isRequired(name: string, schema?: Pojo): boolean;
    isEnum(schema: Pojo): boolean;
    default(schema: Pojo, required: boolean): any;
    change(): void;
    renderItem(nameorindex: string | number): TemplateResult;
    dropItem(): void;
    arrayAppend(index?: number): TemplateResult;
    get value(): any;
    set value(val: any);
    abstract renderField(): TemplateResult;
}
//# sourceMappingURL=mb-form-field.d.ts.map