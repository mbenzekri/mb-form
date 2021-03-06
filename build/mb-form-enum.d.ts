import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormEnum extends MBFormField {
    constructor();
    renderField(): import("lit-element").TemplateResult;
    isSelected(value: any): boolean;
    getValue(): any;
    setValue(val: any): void;
    get enum(): {
        label: string;
        value: any;
    }[];
}
//# sourceMappingURL=mb-form-enum.d.ts.map