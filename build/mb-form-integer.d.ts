import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormInteger extends MBFormField {
    constructor();
    convert(value: any): number;
    renderField(): import("lit-element").TemplateResult;
    get max(): any;
    get min(): any;
    keypress(event: KeyboardEvent): void;
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-integer.d.ts.map