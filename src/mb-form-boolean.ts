/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-boolean")
export class MBFormBoolean extends MBFormField {
    constructor() {
        super({ type: 'boolean' }, true)
    }
    renderField() {
        return html`
            <div class="form-group row">
                <div class="col-sm-3"></div> 
                <div class="col-sm-9">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="input" 
                        ?checked="${this.value}"  
                        @input="${this.change}"
                        @keypress="${this.change}"
                        @click="${this.change}"
                        ?required="${this.required}"
                    />
                    <label class="form-check-label" for="input">&nbsp;${this.label}</label>
                </div>
            </div>
        `;
    }
    getValue(): any { return this.plainValue }
    setValue(_val: any) { 
        this.data[Array.isArray(this.data) ? this.index : this.name] = this.input.checked
    }
}