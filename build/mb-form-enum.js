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
let MBFormEnum = class MBFormEnum extends MBFormField {
    constructor() {
        super({ type: 'string' }, null);
    }
    renderField() {
        return html `
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <select 
                        class="form-control" 
                        id="input" 
                        .value="${this.value}" 
                        @input="${this.change}" 
                        ?required="${this.required}"
                    >
                        ${this.enum.map(item => html `<option .value="${item.value}">${item.label}</option>`)}
                    </select>
                </div>
            </div>
        `;
    }
    getValue() { return this.data[Array.isArray(this.data) ? this.index : this.name]; }
    setValue(val) {
        switch (this.schema.type) {
            case 'integer':
                val = parseInt(val, 10);
                break;
            case 'number':
                val = parseFloat(val);
                break;
            case 'boolean':
                val = !!val;
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = val;
    }
    get enum() {
        if (this.schema.enum)
            return this.schema.enum.map((value) => { return { label: value.toString(), value }; });
        if (this.schema.oneOf)
            return this.schema.oneOf.map((type) => { var _a, _b; return { label: (_b = (_a = type.title) !== null && _a !== void 0 ? _a : type.description) !== null && _b !== void 0 ? _b : type.const, value: type.const }; });
        if (this.schema.anyOf)
            return this.schema.anyOf.map((type) => { var _a, _b; return { label: (_b = (_a = type.title) !== null && _a !== void 0 ? _a : type.description) !== null && _b !== void 0 ? _b : type.const, value: type.const }; });
        return [];
    }
};
MBFormEnum = __decorate([
    customElement("mb-form-enum")
], MBFormEnum);
export { MBFormEnum };
//# sourceMappingURL=mb-form-enum.js.map