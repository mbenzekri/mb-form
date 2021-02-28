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
let MBFormObject = class MBFormObject extends MBFormField {
    constructor() {
        super({ type: 'object' }, {});
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
    renderField() {
        const itemTemplates = [];
        const properties = this.schema.properties;
        // render properties with grouping
        if (properties) {
            const grouping = Object.entries(properties)
                .map(([propname, schema]) => ({ propname, group: schema.group ? schema.group : `__` }));
            let current = '';
            let group = [];
            grouping.forEach(item => {
                if (item.group === current) {
                    group.push(this.renderItem(item.propname));
                }
                else {
                    if (group.length) {
                        itemTemplates.push(html `<div class="panel"><div style="text-align:center;font-weight: bold;">${current}</div>${group}</div>`);
                        group = [];
                        current = '';
                    }
                    if (item.group === '__') {
                        itemTemplates.push(this.renderItem(item.propname));
                    }
                    else {
                        current = item.group;
                        group.push(this.renderItem(item.propname));
                    }
                }
            });
        }
        return html `${this.isItem
            ? html `<div @click="${this.focusout}">${this.renderLabel}</div>${itemTemplates}`
            : html `<div class="panel">
                        <label class="col-sm-3 col-form-label" @click="${this.toggle}" >${this.renderLabel}</label>
                        ${this.collapsed ? html `${this.abstract(this.schema, this.value)}` : html ``}
                        <hr ?hidden="${this.collapsed}" style="margin: 0 0" >
                        <div ?hidden="${this.collapsed}" > ${itemTemplates} </div>
                    </div>`}`;
    }
    focusout(evt) {
        var _a;
        const event = new Event('focusout', { bubbles: true, composed: true });
        (_a = evt.target) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
    }
    toggle() {
        this.collapsed = !this.collapsed;
    }
    checkValidity() {
        if (!this.shadowRoot)
            return false;
        const nodelist = this.shadowRoot.querySelectorAll('mb-form-number, mb-form-date, mb-form-string, mb-form-array');
        for (const field of nodelist)
            if (!field.valid)
                return false;
        return true;
    }
    getValue() { return this.plainValue; }
    setValue(val) {
        let convert;
        switch (true) {
            case typeof val === 'object':
                convert = val;
                break;
            case typeof val === 'string':
                try {
                    convert = JSON.parse(val);
                }
                catch (e) {
                    null;
                }
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert;
    }
};
__decorate([
    property({ attribute: false })
], MBFormObject.prototype, "collapsed", void 0);
MBFormObject = __decorate([
    customElement("mb-form-object")
], MBFormObject);
export { MBFormObject };
//# sourceMappingURL=mb-form-object.js.map