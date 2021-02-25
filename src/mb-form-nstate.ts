/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, property } from "lit-element";
import { MBFormField } from "./mb-form-field";


/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-nstate")
export class MBFormNState extends MBFormField {

    constructor() {
        super({ type: 'string' }, null)
    }
    @property({attribute: false}) values: { label: string; value: any }[] = []

    getEnum(): { label: string; value: any }[] {
        if (this.schema.enum) return this.schema.enum.map((value: any) => { return { label: value.toString(), value } })
        if (this.schema.oneOf) return this.schema.oneOf.map((type: any) => { return { label: type.title ?? type.description ?? type.const, value: type.const } })
        if (this.schema.anyOf) return this.schema.anyOf.map((type: any) => { return { label:  type.title ?? type.description ?? type.const, value: type.const } })
        return []
    }

    firstUpdated(changedProperties: Map<string, any>) {
        super.firstUpdated(changedProperties)
        this.values = this.getEnum()
    }

    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label> 
                <div class="col-sm-9">
                ${this.values.map((item,i) => html`
                    <div class="form-check form-check-inline">
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="input" 
                            id="input${i}" 
                            .value="${item.value}" 
                            @click="${this.select}" 
                            ?required="${this.required}"
                            ?checked="${this.checked(item.value)}"
                        />
                        <label class="form-check-label" for="input${i}">${item.label}</label>
                    </div>
                `)}
                </div>
            </div>
        `;
    }
    checked(value: any) {
        return (this.value === value)
    }
    select(event: MouseEvent) {
        this.value = (event.target as HTMLInputElement).value
        this.valid = true
    }
    getValue(): any { return this.plainValue }
    setValue(val: any) {
        switch(this.schema.type) {
            case 'integer' : val = parseInt(val,10); break
            case 'number' : val = parseFloat(val); break
            case 'boolean' : val = (typeof val === 'string') ? ((val === 'true') ? true : (val === 'false' ) ? false : null) : !!val; break
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = val
    }
}