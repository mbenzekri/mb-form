/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-number")
export class MBFormNumber extends MBFormField {
    constructor() {
        super({ type: 'number' }, 3.141599265);
    }

    static get styles() {
        return [
            ...super.styles,
            css`
            /* Chrome, Safari, Edge, Opera */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            /* Firefox */
            input[type=number] {
                -moz-appearance: textfield;
            }`
        ]
    }
    

    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <div class="input-group">
                        <input 
                            class="form-control" 
                            type="number" 
                            id="input"
                            .value="${this.value}" 
                            @input="${this.change}"
                            .min="${this.min}"
                            .max="${this.max}"
                            step="1e-12"
                            ?required="${this.required}"
                        />
                        ${this.arrayAppend(this.index)}
                    </div>
                </div>
            </div>
        `;
    }
    get max() {
        if (this.schema.maximumExclusive && 'maximum' in this.schema) return this.schema.maximum - 1e-12
        if ('maximum' in this.schema) return this.schema.maximum
        return ''
    }
    get min() {
        if (this.schema.minimumExclusive && 'minimum' in this.schema) return this.schema.minimum + 1e-12
        if ('minimum' in this.schema) return this.schema.minimum
        return ''
    }
    get value(): any { return super.value }
    set value(val: any) {
        let convert
        switch(true) {
            case typeof val === 'string' : 
                convert = parseFloat(val)
                break;
            case typeof val === 'number' : 
                convert = val
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert
    }

}