/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";


/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-enum")
export class MBFormEnum extends MBFormField {

    constructor() {
        super({ type: 'string' }, null)
    }
    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label> 
                <div class="col-sm-9">
                    <select 
                        class="form-select" 
                        id="input" 
                        .value="${this.value}" 
                        @input="${this.change}" 
                        ?required="${this.required}"
                    >
                        <option ?selected="${this.isSelected(null)}" .value="${''}">&lt;vide&gt;</option>
                        ${this.enum.map(item => html`<option ?selected="${this.isSelected(item.value)}" .value="${item.value}">${item.label}</option>`)}
                    </select>
                </div>
            </div>
        `;
    }
    isSelected(value: any ) { return this.value === value }
    getValue(): any { return this.plainValue }
    setValue(val: any) {
        switch(this.schema.type) {
            case 'integer' : val = parseInt(val,10); break
            case 'number' : val = parseFloat(val); break
            case 'boolean' : val =!!val; break
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = val
    }
    get enum(): { label: string; value: any }[] {
        if (this.schema.enum) return this.schema.enum.map((value: any) => { return { label: value.toString(), value } })
        if (this.schema.oneOf) return this.schema.oneOf.map((type: any) => { return { label: type.title ?? type.description ?? type.const, value: type.const } })
        if (this.schema.anyOf) return this.schema.anyOf.map((type: any) => { return { label:  type.title ?? type.description ?? type.const, value: type.const } })
        return []
    }
}