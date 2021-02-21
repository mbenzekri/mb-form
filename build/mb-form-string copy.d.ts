import { MBFormField } from "./mb-form-field";
export declare class MBFormString extends MBFormField {
    constructor();
    renderField(): import("lit-element").TemplateResult;
    get minlength(): any;
    get maxlength(): any;
    get pattern(): any;
    convert(value: any): any;
    get password(): boolean;
    init(): void;
}
//# sourceMappingURL=mb-form-string copy.d.ts.map