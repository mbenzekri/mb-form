
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html,css , property, TemplateResult } from "lit-element";
import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-object")
export class MBFormObject extends MBFormField {
    @property({ attribute: false }) collapsed = false
    constructor() {
        super({ type: 'object' }, {})
    }
    static get styles() {
        return [ 
                css`
                .panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }
                `
            ]
    }
    renderField() {
        const itemTemplates: TemplateResult[] = [];
        if (this.schema.properties) 
            Object.keys(this.schema.properties).forEach(name => {
                itemTemplates.push(this.renderItem(name));
            })
        return html`
                <div class="panel">
                    <h5 style="text-align:center" @click="${this.toggle}">${this.label}</h5>
                    <div ?hidden="${this.collapsed}" ><hr> ${itemTemplates}</div>
                </div>`
    }

    toggle() {
        this.collapsed = !this.collapsed
    }
    checkValidity() {
        if (!this.shadowRoot) return false
        const nodelist = this.shadowRoot.querySelectorAll('mb-form-number, mb-form-date, mb-form-string, mb-form-array')
        for (const field of nodelist) if (!(field as MBFormField).valid) return false
        return true
    }
    getValue(): any { return this.plainValue }
    setValue(val: any) {
        let convert
        switch(true) {
            case typeof val === 'object': 
                convert = val
                break;
            case typeof val === 'string' : 
                try { convert = JSON.parse(val)} catch (e) { null }
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert
    }

}