import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormString extends MBFormField {
    constructor();
    static get styles(): import("lit-element").CSSResult[];
    renderField(): import("lit-element").TemplateResult;
    change(): void;
    get minlength(): any;
    get maxlength(): any;
    get pattern(): any;
    get type(): "color" | "email" | "password" | "url" | "text";
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-string.d.ts.map