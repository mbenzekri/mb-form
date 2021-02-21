/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, css, property, TemplateResult } from "lit-element";
import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-array")
export class MBFormArray extends MBFormField {

    @property({ attribute: false }) collapsed = false

    constructor() {
        super({ type: 'array' }, [])
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
    connectedCallback() {
        super.connectedCallback()
        this.addEventListener('remove-item' as any,this.removeItem) 
    }
    renderField() {
        const itemTemplates: TemplateResult[] = [];
        this.data && this.data[this.name].forEach((_v: any, index: number) => {
            itemTemplates.push(this.renderItem(index))
        });
        return html`
                <div class="panel">
                    <h5 style="text-align:center" @click="${this.toggle}">${this.label}</h5>
                    <div ?hidden="${this.collapsed}" ><hr> ${itemTemplates}</div>
                    <div class="d-flex justify-content-end">
                        <button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm ">+</button>
                    </div>
                </div>`
    }
    removeItem(event: CustomEvent) {
        const index = event.detail.index as number
        this.value.splice(index,1)
        event.preventDefault()
        event.stopImmediatePropagation()
        this.requestUpdate()
    }
    add() {
        this.value.push(this.default(this.schema.items, true))
        this.requestUpdate()
    }
    get nomore(): boolean {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems
    }

    toggle() {
        this.collapsed = !this.collapsed
    }
    getValue(): any { return this.data[Array.isArray(this.data) ? this.index : this.name] }
    setValue(val: any) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = Array.isArray(val) ? val : undefined
    }
}