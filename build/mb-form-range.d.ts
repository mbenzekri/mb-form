import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormRange extends MBFormField {
    constructor();
    static get styles(): import("lit-element").CSSResult[];
    renderField(): import("lit-element").TemplateResult;
    change(): void;
    get max(): any;
    get min(): any;
    keypress(event: KeyboardEvent): void;
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-range.d.ts.map