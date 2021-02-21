var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
// import {classMap} from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { MBFormField } from "./mb-form-field";
let MBFormString = class MBFormString extends MBFormField {
    constructor() {
        super({ type: 'string' }, { _dummy_: 'default data' });
    }
    renderField() {
        return html `
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <input id="input" 
                        type="${this.password ? 'password' : 'text'}" 
                        class="form-control" 
                        placeholder="${this.label}"
                        .value="${this.value}" 
                        @input="${this.change}"
                        @keypress="${this.change}"
                        minlength="${ifDefined(this.minlength)}"
                        maxlength="${ifDefined(this.maxlength)}"
                        pattern="${ifDefined(this.pattern)}"
                        ?required="${this.required}"
                    />
                </div>
            </div>
        `;
    }
    get minlength() { return this.schema.minLength; }
    get maxlength() { return this.schema.maxLength; }
    get pattern() { return this.schema.pattern; }
    convert(value) { return value.toString(); }
    get password() { var _a; return !!((_a = this.schema.options) === null || _a === void 0 ? void 0 : _a.password); }
    init() { 0; }
};
MBFormString = __decorate([
    customElement("mb-form-string")
], MBFormString);
export { MBFormString };
//# sourceMappingURL=mb-form-string copy.js.map