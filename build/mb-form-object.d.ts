import { TemplateResult } from "lit-element";
import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormObject extends MBFormField {
    collapsed: boolean;
    constructor();
    static get styles(): import("lit-element").CSSResult[];
    renderField(): TemplateResult;
    focusout(evt: Event): void;
    toggle(): void;
    checkValidity(): boolean;
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-object.d.ts.map