import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormArray extends MBFormField {
    collapsed: boolean;
    current: number | null;
    constructor();
    static get styles(): import("lit-element").CSSResult[];
    connectedCallback(): void;
    renderField(): import("lit-element").TemplateResult;
    handleRemove(event: CustomEvent): void;
    drag(ev: DragEvent, index: number): void;
    drop(ev: DragEvent): void;
    allowDrop(ev: DragEvent): void;
    blur(): void;
    del(index: number): void;
    edit(index: number): void;
    add(): void;
    get nomore(): boolean;
    toggle(): void;
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-array.d.ts.map