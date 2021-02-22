/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
function iso(date = new Date()) {
    return date.toISOString().substr(0,16) 
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-datetime")
export class MBFormDatetime extends MBFormField {

    constructor() {
        super({ type: 'string', format: 'date-time' }, iso())
    }
    convert(value: any) { return (value instanceof Date) ? value :  new Date(value.toString()) }
    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <input 
                        class="form-control" 
                        type="datetime-local" 
                        id="input" 
                        .value="${this.value}" 
                        @input="${this.change}"
                        ?required="${this.required}"
                    />
                </div>
            </div>
        `;
    }
    getValue(): any {
        if (!this.data) return ''
        const val = this.plainValue
        switch(true) {
            case typeof val === 'string': return iso(new Date(val))
            case val instanceof Date : return iso(val)
            case typeof val === 'number' : return iso(new Date(val))
        }
        return ''
    }
    setValue(val: any) {
        let convert
        switch(true) {
            case typeof val === 'string' && /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ?/.test(val) : 
                convert = iso(new Date(val))
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