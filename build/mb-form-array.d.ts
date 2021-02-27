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
    get nomore(): boolean;
    get noless(): boolean;
    constructor();
    getValue(): any;
    setValue(val: any): void;
    static get styles(): import("lit-element").CSSResult[];
    connectedCallback(): void;
    renderField(): import("lit-element").TemplateResult;
    private renderStatic;
    private renderEditable;
    focusout(evt: Event): void;
    drag(ev: DragEvent, index: number): void;
    drop(ev: DragEvent): void;
    allowDrop(ev: DragEvent): void;
    del(index: number, evt?: Event): void;
    edit(index: number): void;
    add(): void;
    toggle(): void;
}
//# sourceMappingURL=mb-form-array.d.ts.map