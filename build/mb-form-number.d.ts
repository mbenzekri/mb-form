import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormNumber extends MBFormField {
    constructor();
    static get styles(): import("lit-element").CSSResult[];
    renderField(): import("lit-element").TemplateResult;
    get max(): any;
    get min(): any;
    get value(): any;
    set value(val: any);
}
//# sourceMappingURL=mb-form-number.d.ts.map