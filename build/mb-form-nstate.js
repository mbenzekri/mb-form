var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, property } from "lit-element";
import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let MBFormNState = class MBFormNState extends MBFormField {
    constructor() {
        super({ type: 'string' }, null);
        this.values = [];
    }
    getEnum() {
        if (this.schema.enum)
            return this.schema.enum.map((value) => { return { label: value.toString(), value }; });
        if (this.schema.oneOf)
            return this.schema.oneOf.map((type) => { var _a, _b; return { label: (_b = (_a = type.title) !== null && _a !== void 0 ? _a : type.description) !== null && _b !== void 0 ? _b : type.const, value: type.const }; });
        if (this.schema.anyOf)
            return this.schema.anyOf.map((type) => { var _a, _b; return { label: (_b = (_a = type.title) !== null && _a !== void 0 ? _a : type.description) !== null && _b !== void 0 ? _b : type.const, value: type.const }; });
        return [];
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.values = this.getEnum();
    }
    renderField() {
        return html `
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label> 
                <div class="col-sm-9">
                ${this.values.map((item, i) => html `
                    <div class="form-check form-check-inline">
                        <input 
                            class="form-check-input" 
                            type="radio" 
                            name="input" 
                            id="input${i}" 
                            .value="${item.value}" 
                            @click="${this.select}" 
                            ?required="${this.required}"
                            ?checked="${this.checked(item.value)}"
                        />
                        <label class="form-check-label" for="input${i}">${item.label}</label>
                    </div>
                `)}
                </div>
            </div>
        `;
    }
    checked(value) {
        return (this.value === value);
    }
    select(event) {
        this.value = event.target.value;
        this.valid = true;
    }
    getValue() { return this.plainValue; }
    setValue(val) {
        switch (this.schema.type) {
            case 'integer':
                val = parseInt(val, 10);
                break;
            case 'number':
                val = parseFloat(val);
                break;
            case 'boolean':
                val = (typeof val === 'string') ? ((val === 'true') ? true : (val === 'false') ? false : null) : !!val;
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = val;
    }
};
__decorate([
    property({ attribute: false })
], MBFormNState.prototype, "values", void 0);
MBFormNState = __decorate([
    customElement("mb-form-nstate")
], MBFormNState);
export { MBFormNState };
//# sourceMappingURL=mb-form-nstate.js.map