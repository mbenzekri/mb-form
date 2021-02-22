import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export declare class MBFormNState extends MBFormField {
    constructor();
    values: {
        label: string;
        value: any;
    }[];
    getEnum(): {
        label: string;
        value: any;
    }[];
    firstUpdated(changedProperties: Map<string, any>): void;
    renderField(): import("lit-element").TemplateResult;
    checked(value: any): boolean;
    select(event: MouseEvent): void;
    getValue(): any;
    setValue(val: any): void;
}
//# sourceMappingURL=mb-form-nstate.d.ts.map