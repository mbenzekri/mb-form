/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import {ifDefined} from 'lit-html/directives/if-defined';

import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-string")
export class MBFormString extends MBFormField {
    constructor() {
        super({ type: 'string' }, 'initial string')
    }
    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <input id="input" 
                        type="${this.password ? 'password' : 'text'}" 
                        class="form-control" 
                        placeholder="${this.label}"
                        .value="${this.value}" 
                        @input="${this.change}"
                        @keypress="${this.change}"
                        minlength="${ifDefined(this.minlength)}"
                        maxlength="${ifDefined(this.maxlength)}"
                        pattern="${ifDefined(this.pattern)}"
                        ?required="${this.required}"
                    />
                </div>
            </div>
        `;
    }
    get minlength() { return this.schema.minLength }
    get maxlength() { return this.schema.maxLength }
    get pattern() { return this.schema.pattern }
    get password() {return !!this.schema.options?.password }
    
    getValue(): any {
        return this.data[Array.isArray(this.data) ? this.index : this.name]
    }

    setValue(val: any) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = val.toString()
    }

}