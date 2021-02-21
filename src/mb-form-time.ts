/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
function iso(date = new Date()) {
    return date.toISOString().substr(11,5) 
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-time")
export class MBFormTime extends MBFormField {

    constructor() {
        super({ type: 'string', format: 'time' }, iso())
    }
    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <input 
                        class="form-control timepicker" 
                        type="time" 
                        id="input" 
                        .value="${this.value}" 
                        @input="${this.change}"
                        ?required="${this.required}"
                    />
                </div>
            </div>
        `;
    }
    getValue(): any { return this.data[Array.isArray(this.data) ? this.index : this.name] }
    setValue(val: any) {
        let convert
        switch(true) {
            case typeof val === 'string' : 
                convert = val
                break;
            case typeof val === 'number' : 
                convert = iso(new Date(val))
                break;
            case val instanceof Date : 
                convert = iso(val)
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert
    }
}