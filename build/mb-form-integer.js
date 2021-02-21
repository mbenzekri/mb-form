var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let MBFormInteger = class MBFormInteger extends MBFormField {
    constructor() {
        super({ type: 'integer' }, 123456789);
    }
    convert(value) { return (typeof value === 'number') ? Math.floor(value) : parseInt(value.toString(), 10); }
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
                            @keypress="${this.keypress}"
                            .min="${this.min}"
                            .max="${this.max}"
                            step="1"
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
            return this.schema.maximum - 1;
        if ('maximum' in this.schema)
            return this.schema.maximum;
        return '';
    }
    get min() {
        if (this.schema.minimumExclusive && 'minimum' in this.schema)
            return this.schema.minimum + 1;
        if ('minimum' in this.schema)
            return this.schema.minimum;
        return '';
    }
    keypress(event) {
        if (!/[-0123456789]/.test(event.key))
            return event.preventDefault();
        if (this.min >= 0 && event.key === '-')
            return event.preventDefault();
        return;
    }
    get value() { return super.value; }
    set value(val) {
        let convert;
        switch (true) {
            case typeof val === 'string':
                convert = parseInt(val);
                break;
            case typeof val === 'number':
                convert = Math.floor(val);
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert;
    }
};
MBFormInteger = __decorate([
    customElement("mb-form-integer")
], MBFormInteger);
export { MBFormInteger };
//# sourceMappingURL=mb-form-integer.js.map