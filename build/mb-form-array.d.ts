import { TemplateResult } from "lit-element";
import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormArray extends MBFormField {
    collapsed: boolean;
    constructor();
    static get styles(): import("lit-element").CSSResult[];
    connectedCallback(): void;
    renderField(): TemplateResult;
    removeItem(event: CustomEvent): void;
    add(): void;
    get nomore(): boolean;
    toggle(): void;
    get value(): any;
    set value(val: any);
}
//# sourceMappingURL=mb-form-array.d.ts.map