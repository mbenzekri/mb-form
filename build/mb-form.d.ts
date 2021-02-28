import { LitElement } from "lit-element";
export declare type Pojo = {
    [key: string]: any;
};
import "./mb-form-object";
/**
 * @prop schema
 * @prop data
 */
export declare class MBForm extends LitElement {
    private _schema;
    obj: {
        content: {};
    };
    confirmlabel: string;
    cancellabel: string;
    get schema(): Pojo;
    set schema(value: Pojo);
    get data(): Pojo;
    set data(value: Pojo);
    constructor();
    render(): import("lit-element").TemplateResult;
    confirm(): void;
    cancel(): void;
    compile(): void;
    definition(ref: string): Pojo;
}
//# sourceMappingURL=mb-form.d.ts.map