var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, css, property, } from "lit-element";
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
        this.current = null;
    }
    get nomore() {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems;
    }
    get noless() {
        return this.schema.minItems && this.value && this.value.length <= this.schema.minItems;
    }
    getValue() { return this.plainValue; }
    setValue(val) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = Array.isArray(val) ? val : undefined;
    }
    static get styles() {
        return [
            css `.panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }`
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('remove-item', (evt) => { this.del(evt.detail.index); });
    }
    renderField() {
        if (!this.data)
            return html `<div class="form-group row"></div>`;
        const lines = this.data[this.name].map((_i, i) => html `${(this.current === i) ? this.renderEditable(i) : this.renderStatic(i)}`);
        return html `
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
            </div>`;
    }
    renderStatic(index) {
        return html `
        <li 
                id="${index}"
                draggable="true" 
                @dragstart="${(ev) => this.drag(ev, index)}"
                @dragover="${this.allowDrop}"
                @drop="${this.drop}"
                @click="${() => this.edit(index)}" 
                class="list-group-item"
            >
            <span class="badge bg-primary rounded-pill">${index}</span>
            ${this.abstract(this.schema.items, this.value[index])}
            <button ?hidden="${this.noless}" @click="${(evt) => this.del(index, evt)}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>
        </li>`;
    }
    renderEditable(index) {
        return html `<li @focusout="${this.focusout}" class="list-group-item"> ${this.renderItem(index)} </li>`;
    }
    focusout(evt) {
        this.current = null;
        evt.preventDefault();
        evt.stopPropagation();
    }
    drag(ev, index) {
        if (ev.dataTransfer) {
            ev.dataTransfer.setData('text', index.toString());
        }
        else if (ev.originalEvent.dataTransfer) {
            ev.originalEvent.dataTransfer.setData('text', index.toString());
        }
        this.current = null;
        this.requestUpdate();
    }
    drop(ev) {
        if (ev.dataTransfer) {
            const from = parseInt(ev.dataTransfer.getData("text"), 10);
            const to = parseInt(ev.target.id);
            this.value.splice(to, 0, this.value.splice(from, 1)[0]);
            this.requestUpdate();
        }
        ev.preventDefault();
    }
    allowDrop(ev) {
        ev.preventDefault();
    }
    del(index, evt) {
        if (this.noless)
            return;
        this.value.splice(index, 1);
        this.current = null;
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        this.requestUpdate();
    }
    edit(index) {
        this.current = index;
        this.focus();
        this.requestUpdate();
    }
    add() {
        if (this.nomore)
            return;
        this.value.push(this.default(this.schema.items, true));
        this.edit(this.value.length - 1);
    }
    toggle() { this.collapsed = !this.collapsed; }
};
__decorate([
    property({ attribute: false })
], MBFormArray.prototype, "collapsed", void 0);
__decorate([
    property({ attribute: false })
], MBFormArray.prototype, "current", void 0);
MBFormArray = __decorate([
    customElement("mb-form-array")
], MBFormArray);
export { MBFormArray };
//# sourceMappingURL=mb-form-array.js.map