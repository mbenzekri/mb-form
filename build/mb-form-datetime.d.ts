import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormDatetime extends MBFormField {
    constructor();
    convert(value: any): Date;
    renderField(): import("lit-element").TemplateResult;
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-datetime.d.ts.map