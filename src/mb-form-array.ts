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
        this.addEventListener('remove-item' as any, this.handleRemove)
    }
    renderField() {
        if (!this.data) return html`<div class="form-group row"></div>`

        return html`
            <div  @focusout="${this.blur}" >
                <div class="form-group row">
                    <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label>
                    <div class="col-sm-9"> 
                        <ul ?hidden="${this.collapsed}" class="list-group" >
                            ${this.data[this.name].map((item: unknown, i: number) => html`
                                ${(this.current !== i) 
                                    ? html`<li 
                                                id="${i}"
                                                draggable="true" 
                                                @dragstart="${(ev: DragEvent) => this.drag(ev,i)}"
                                                @dragover="${this.allowDrop}"
                                                @drop="${this.drop}"
                                                @click="${() => this.edit(i)}" 
                                                class="list-group-item"
                                            >
                                            <span class="badge bg-primary rounded-pill">${i}</span>
                                            ${item}
                                            <button @click="${() => this.del(i)}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>
                                        </li>` 
                                    : html``
                                }
                                ${(this.current === i) 
                                    ? html`<li @focusout="${this.blur}" class="list-group-item">
                                            ${this.renderItem(this.current)}
                                        </li>` 
                                    : html``
                                }
                            `)}
                            <li class="list-group-item"><button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm ">Ajouter</button></li>
                        </ul>
                    </div>
                </div>
            </div>`
    }
    handleRemove(event: CustomEvent) {
        const index = event.detail.index as number
        this.del(index)
        event.preventDefault()
        event.stopImmediatePropagation()
    }
    drag(ev: DragEvent, index: number) {
        if (ev.dataTransfer) {
            ev.dataTransfer.setData('text', index.toString());
        }
        else if ((ev as any).originalEvent.dataTransfer){
            (ev as any).originalEvent.dataTransfer.setData('text', index.toString());
        }
        this.current = null
        this.requestUpdate()
      }

    drop(ev: DragEvent) {
        if (ev.dataTransfer) {
            const from = parseInt(ev.dataTransfer.getData("text"),10)
            const to = parseInt((ev.target as HTMLElement).id)
            this.value.splice(to, 0, this.value.splice(from, 1)[0])
            this.requestUpdate()
        }
        ev.preventDefault();
    }
    allowDrop(ev: DragEvent) {
        ev.preventDefault();
    }
    blur() {
        this.current = null 
    }
    del(index: number) {
        this.value.splice(index, 1)
        this.current = null
        this.requestUpdate()
    }
    edit(index: number) {
        this.current = index
        this.requestUpdate()
    }
    add() {
        this.current = this.value.length
        this.value.push(this.default(this.schema.items, true))
        this.requestUpdate()
    }
    get nomore(): boolean {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems
    }

    toggle() {
        this.collapsed = !this.collapsed
    }
    getValue(): any { return this.plainValue }
    setValue(val: any) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = Array.isArray(val) ? val : undefined
    }
}