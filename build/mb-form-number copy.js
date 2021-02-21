var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import { MBFormField } from "./mb-form-field";
let MBFormNumber = class MBFormNumber extends MBFormField {
    constructor() {
        super();
    }
    renderField() {
        return html `
            <div class="input-group mb-3">
                <label class="input-group-text">${this.label}</label>
                <input class="form-control" type="number" id="" .value="${this.value}" @change="${this.change}"/>
            </div>
        `;
    }
};
MBFormNumber = __decorate([
    customElement("mb-form-number")
], MBFormNumber);
export { MBFormNumber };
//# sourceMappingURL=mb-form-number copy.js.map