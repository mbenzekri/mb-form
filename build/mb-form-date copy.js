var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
let MBFormDate = class MBFormDate extends MBFormField {
    constructor() {
        super({ type: 'string', format: 'date' }, { _dummy_: new Date() });
    }
    convert(value) { return (value instanceof Date) ? value : new Date(value.toString()); }
    renderField() {
        return html `
            <div class="form-group row">
                <label for="input" class="col-sm-2 col-form-label">${this.label}</label> 
                <div class="col-sm-10">
                    <input class="form-control" type="date" id="input" .value="${this.value}" @input="${this.change}"/>
                </div>
            </div>
        `;
    }
};
MBFormDate = __decorate([
    customElement("mb-form-date")
], MBFormDate);
export { MBFormDate };
//# sourceMappingURL=mb-form-date copy.js.map