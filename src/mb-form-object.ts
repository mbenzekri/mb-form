
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, css, property, TemplateResult } from "lit-element";
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
                .map(([propname, schema]) => ({ propname, group: schema.tab ?? schema.group, istab: !!schema.tab }))
            let current = ''
            let istab = false
            let group: TemplateResult[] = [];
            let labels: TemplateResult[] = [];
            grouping.forEach((item, i) => {
                if (item.group === current) {
                    // collecting group rendering
                    group.push(this.renderItem(item.propname))
                    labels.push(html`${item.propname}`)
                }
                if ((item.group !== current || (i + 1) === grouping.length) && group.length) {
                    // push the groups on rendering list
                    if (istab) {
                        // render tab group (Actually render tabs as fields)
                        itemTemplates.push(...group)
                        // itemTemplates.push(html`
                        //     <div class="panel">
                        //         <div style="text-align:center;font-weight:bold;">${current}</div>
                        //         ${group}
                        //     </div>`)
                    } else {
                        // render simple group
                        itemTemplates.push(html`
                            <div class="panel">
                                <div style="text-align:center;font-weight:bold;">${current}</div>
                                ${group}
                            </div>`)
                    }
                }
                if (!item.group) {
                    // render single item
                    itemTemplates.push(this.renderItem(item.propname))
                }
                if (item.group && item.group !== current) {
                    current = item.group
                    istab = item.istab
                    group = [this.renderItem(item.propname)]
                    labels = [html`${item.propname}`]
                }
            })
        }
        return html`${this.isItem
            ? html`<div @click="${this.focusout}">${this.renderLabel}</div>${itemTemplates}`
            : html`<div class="panel">
                        <label class="col-sm-3 col-form-label" @click="${this.toggle}" >${this.renderLabel}</label>
                        ${this.collapsed ? html`${this.abstract(this.schema, this.value)}` : html``}
                        <hr ?hidden="${this.collapsed}" style="margin: 0 0" >
                        <div ?hidden="${this.collapsed}" > ${itemTemplates} </div>
                    </div>`}`
    }

    focusout(evt: Event) {
        const event = new Event('focusout', { bubbles: true, composed: true });
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
        switch (true) {
            case typeof val === 'object':
                convert = val
                break;
            case typeof val === 'string':
                try { convert = JSON.parse(val) } catch (e) { null }
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert
    }

}