/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, css, property, /* TemplateResult */ } from "lit-element";
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
    @property({ attribute: false }) current: number | null = null

    get nomore(): boolean {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems
    }

    get noless(): boolean {
        return this.schema.minItems && this.value && this.value.length <= this.schema.minItems
    }

    constructor() {
        super({ type: 'array' }, [])
    }
    getValue(): any { return this.plainValue }
    setValue(val: any) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = Array.isArray(val) ? val : undefined
    }

    static get styles() {
        return [
            css`.panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }`
        ]
    }
    connectedCallback() {
        super.connectedCallback()
        this.addEventListener('remove-item' as any, (evt: CustomEvent) => { this.del(evt.detail.index as number) })
    }
    renderField() {
        if (!this.data) return html`<div class="form-group row"></div>`
        const lines =this.data[this.name].map((_i: unknown, i: number) => html`${(this.current === i) ? this.renderEditable(i) : this.renderStatic(i)}`)
        return html`
            <div  @focusout="${this.focusout}" >
                <div class="form-group row">
                    <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label>
                    <div class="col-sm"> 
                        <ul ?hidden="${this.collapsed}" class="list-group" >
                            ${lines}
                            <li class="list-group-item"  @click="${this.focusout}" ><button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm ">Ajouter</button></li>
                        </ul>
                    </div>
                </div>
            </div>`
    }

    private renderStatic(index: number) {
        return html`
        <li 
                id="${index}"
                draggable="true" 
                @dragstart="${(ev: DragEvent) => this.drag(ev, index)}"
                @dragover="${this.allowDrop}"
                @drop="${this.drop}"
                @click="${() => this.edit(index)}" 
                class="list-group-item"
            >
            <span class="badge bg-primary rounded-pill">${index}</span>
            ${this.abstract(this.schema.items, this.value[index])}
            <button ?hidden="${this.noless}" @click="${(evt: Event) => this.del(index,evt)}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>
        </li>`
    }
    private renderEditable(index: number) {
        return html`<li @focusout="${this.focusout}" class="list-group-item"> ${this.renderItem(index)} </li>`
    }
    focusout(evt: Event) {
        this.current = null
        evt.preventDefault()
        evt.stopPropagation()
    }
    drag(ev: DragEvent, index: number) {
        if (ev.dataTransfer) {
            ev.dataTransfer.setData('text', index.toString());
        }
        else if ((ev as any).originalEvent.dataTransfer) {
            (ev as any).originalEvent.dataTransfer.setData('text', index.toString());
        }
        this.current = null
        this.requestUpdate()
    }
    drop(ev: DragEvent) {
        if (ev.dataTransfer) {
            const from = parseInt(ev.dataTransfer.getData("text"), 10)
            const to = parseInt((ev.target as HTMLElement).id)
            this.value.splice(to, 0, this.value.splice(from, 1)[0])
            this.requestUpdate()
        }
        ev.preventDefault();
    }
    allowDrop(ev: DragEvent) {
        ev.preventDefault();
    }
    del(index: number,evt?: Event) {
        if (this.noless) return
        this.value.splice(index, 1)
        this.current = null
        if (evt) {evt.preventDefault(); evt.stopPropagation()}
        this.requestUpdate()
    }
    edit(index: number) {
        this.current = index
        this.focus()
        this.requestUpdate()
    }
    add() {
        if (this.nomore) return
        this.value.push(this.default(this.schema.items))
        this.edit(this.value.length-1)
    }
    toggle() { this.collapsed = !this.collapsed }
}