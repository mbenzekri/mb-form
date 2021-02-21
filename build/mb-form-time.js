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
    return date.toISOString().substr(11, 5);
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let MBFormTime = class MBFormTime extends MBFormField {
    constructor() {
        super({ type: 'string', format: 'time' }, iso());
    }
    renderField() {
        return html `
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
    get value() { return super.value; }
    set value(val) {
        let convert;
        switch (true) {
            case typeof val === 'string':
                convert = val;
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
MBFormTime = __decorate([
    customElement("mb-form-time")
], MBFormTime);
export { MBFormTime };
//# sourceMappingURL=mb-form-time.js.map