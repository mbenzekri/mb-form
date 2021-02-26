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
        this.addEventListener('remove-item', this.handleRemove);
    }
    renderField() {
        if (!this.data)
            return html `<div class="form-group row"></div>`;
        return html `
            <div  @focusout="${this.blur}" >
                <div class="form-group row">
                    <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label>
                    <div class="col-sm-9"> 
                        <ul ?hidden="${this.collapsed}" class="list-group" >
                            ${this.data[this.name].map((_item, i) => html `
                                ${(this.current !== i)
            ? html `<li 
                                                id="${i}"
                                                draggable="true" 
                                                @dragstart="${(ev) => this.drag(ev, i)}"
                                                @dragover="${this.allowDrop}"
                                                @drop="${this.drop}"
                                                @click="${() => this.edit(i)}" 
                                                class="list-group-item"
                                            >
                                            <span class="badge bg-primary rounded-pill">${i}</span>
                                            ${this.abstract(this.schema.items, this.value[i])}
                                            <button @click="${() => this.del(i)}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>
                                        </li>`
            : html ``}
                                ${(this.current === i)
            ? html `<li @focusout="${this.blur}" class="list-group-item">
                                            ${this.renderItem(i)}
                                        </li>`
            : html ``}
                            `)}
                            <li class="list-group-item"  @click="${this.blur}" ><button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm ">Ajouter</button></li>
                        </ul>
                    </div>
                </div>
            </div>`;
    }
    handleRemove(event) {
        const index = event.detail.index;
        this.del(index);
        event.preventDefault();
        event.stopImmediatePropagation();
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
    blur() {
        this.current = null;
    }
    del(index) {
        this.value.splice(index, 1);
        this.current = null;
        this.requestUpdate();
    }
    edit(index) {
        this.current = index;
        this.focus();
        this.requestUpdate();
    }
    add() {
        this.current = this.value.length;
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
__decorate([
    property({ attribute: false })
], MBFormArray.prototype, "current", void 0);
MBFormArray = __decorate([
    customElement("mb-form-array")
], MBFormArray);
export { MBFormArray };
//# sourceMappingURL=mb-form-array.js.map