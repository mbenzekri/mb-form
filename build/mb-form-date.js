var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
function iso(date = new Date()) {
    return date.toISOString().substr(0, 10);
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let MBFormDate = class MBFormDate extends MBFormField {
    constructor() {
        super({ type: 'string', format: 'date' }, iso());
    }
    renderField() {
        return html `
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label> 
                <div class="col-sm-9">
                    <input 
                        class="form-control" 
                        type="date" id="input" 
                        .value="${this.value}" 
                        @input="${this.change}"
                        ?required="${this.required}"
                        />
                </div>
            </div>
        `;
    }
    getValue() {
        if (!this.data)
            return '';
        const val = Array.isArray(this.data) ? this.data[this.index] : this.data[this.name];
        switch (true) {
            case typeof val === 'string': return iso(new Date(val));
            case val instanceof Date: return iso(val);
            case typeof val === 'number': return iso(new Date(val));
        }
        return '';
    }
    setValue(val) {
        let convert = null;
        switch (true) {
            case typeof val === 'string' && /\d\d\d\d-\d\d-\d\d/.test(val):
                convert = iso(new Date(val));
                break;
            case typeof val === 'number':
                convert = iso(new Date(val));
                break;
            case val instanceof Date:
                convert = iso(val);
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert;
    }
};
MBFormDate = __decorate([
    customElement("mb-form-date")
], MBFormDate);
export { MBFormDate };
//# sourceMappingURL=mb-form-date.js.map