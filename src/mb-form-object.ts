
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html,css , property, TemplateResult } from "lit-element";
import { MBFormField, Pojo } from "./mb-form-field";

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
        const properties = this.schema.properties
        // render properties with grouping
        if (properties) {
            const grouping = Object.entries(properties as Pojo)
                .map(([propname, schema]) => ({propname, group: schema.group ? schema.group : `__`}))
            let current = ''
            let group: TemplateResult[] = [];
            grouping.forEach(item => {
                if (item.group === current) {
                    group.push(this.renderItem(item.propname))
                } else {
                    if (group.length) {
                        itemTemplates.push(html`<div class="panel"><div style="text-align:center;font-weight: bold;">${current}</div>${group}</div>`)
                        group = []
                        current = ''
                    }
                    if (item.group === '__') {
                        itemTemplates.push(this.renderItem(item.propname))
                    } else {
                        current = item.group
                        group.push(this.renderItem(item.propname))
                    }
                }
            })
        }
        return html`${ this.isItem 
                ? html`<div @click="${this.focusout}">${this.renderLabel}</div>${itemTemplates}` 
                : html`<div class="panel">
                        <label class="col-sm-3 col-form-label" @click="${this.toggle}" >${this.renderLabel}</label>
                        ${ this.collapsed ? html`${this.abstract(this.schema,this.value)}`  : html``}
                        <hr ?hidden="${this.collapsed}" style="margin: 0 0" >
                        <div ?hidden="${this.collapsed}" > ${itemTemplates} </div>
                    </div>`}`
    }

    focusout(evt: Event) {
        const event = new Event('focusout',{bubbles: true, composed: true});
        evt.target?.dispatchEvent(event); 
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