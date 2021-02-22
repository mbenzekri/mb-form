var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, css, property } from "lit-element";
import { MBFormField } from "./mb-form-field";
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let MBFormArray = class MBFormArray extends MBFormField {
    constructor() {
        super({ type: 'array' }, []);
        this.collapsed = false;
    }
    static get styles() {
        return [
            css `
                .panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }
                `
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('remove-item', this.removeItem);
    }
    renderField() {
        const itemTemplates = [];
        this.data && this.data[this.name].forEach((_v, index) => {
            itemTemplates.push(this.renderItem(index));
        });
        return html `
                <div class="panel">
                    <h5 style="text-align:center" @click="${this.toggle}">${this.label}</h5>
                    <div ?hidden="${this.collapsed}" >
                        <hr> 
                        ${itemTemplates}
                        <div class="d-flex justify-content-end">
                            <button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm ">+</button>
                        </div>
                    </div>
                </div>`;
    }
    removeItem(event) {
        const index = event.detail.index;
        this.value.splice(index, 1);
        event.preventDefault();
        event.stopImmediatePropagation();
        this.requestUpdate();
    }
    add() {
        this.value.push(this.default(this.schema.items, true));
        this.requestUpdate();
    }
    get nomore() {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems;
    }
    toggle() {
        this.collapsed = !this.collapsed;
    }
    getValue() { return this.plainValue; }
    setValue(val) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = Array.isArray(val) ? val : undefined;
    }
};
__decorate([
    property({ attribute: false })
], MBFormArray.prototype, "collapsed", void 0);
MBFormArray = __decorate([
    customElement("mb-form-array")
], MBFormArray);
export { MBFormArray };
//# sourceMappingURL=mb-form-array.js.map