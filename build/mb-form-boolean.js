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
let MBFormBoolean = class MBFormBoolean extends MBFormField {
    constructor() {
        super({ type: 'boolean' }, true);
    }
    renderField() {
        return html `
            <div class="form-group row">
                <div class="col-sm-3"></div> 
                <div class="col-sm-9">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="input" 
                        ?checked="${this.value}"  
                        @input="${this.change}"
                        @keypress="${this.change}"
                        @click="${this.change}"
                        ?required="${this.required}"
                    />
                    <label class="form-check-label" for="input">&nbsp;${this.label} </label>
                </div>
            </div>
        `;
    }
    getValue() { return this.data[Array.isArray(this.data) ? this.index : this.name]; }
    setValue(_val) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = this.input.checked;
    }
};
MBFormBoolean = __decorate([
    customElement("mb-form-boolean")
], MBFormBoolean);
export { MBFormBoolean };
//# sourceMappingURL=mb-form-boolean.js.map