var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let MBFormNumber = class MBFormNumber extends MBFormField {
    constructor() {
        super({ type: 'number' }, 3.141599265);
    }
    static get styles() {
        return [
            ...super.styles,
            css `
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
        ];
    }
    renderField() {
        return html `
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
        if (this.schema.maximumExclusive && 'maximum' in this.schema)
            return this.schema.maximum - 1e-12;
        if ('maximum' in this.schema)
            return this.schema.maximum;
        return '';
    }
    get min() {
        if (this.schema.minimumExclusive && 'minimum' in this.schema)
            return this.schema.minimum + 1e-12;
        if ('minimum' in this.schema)
            return this.schema.minimum;
        return '';
    }
    getValue() { return this.plainValue; }
    setValue(val) {
        let convert;
        switch (true) {
            case typeof val === 'string':
                convert = parseFloat(val);
                break;
            case typeof val === 'number':
                convert = val;
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert;
    }
};
MBFormNumber = __decorate([
    customElement("mb-form-number")
], MBFormNumber);
export { MBFormNumber };
//# sourceMappingURL=mb-form-number.js.map