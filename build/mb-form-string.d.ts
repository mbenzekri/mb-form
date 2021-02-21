import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormString extends MBFormField {
    constructor();
    renderField(): import("lit-element").TemplateResult;
    get minlength(): any;
    get maxlength(): any;
    get pattern(): any;
    get password(): boolean;
}
//# sourceMappingURL=mb-form-string.d.ts.map