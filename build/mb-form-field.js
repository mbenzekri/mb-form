var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, css, LitElement, property } from "lit-element";
function isbasic(name) {
    if (typeof name !== 'string')
        return false;
    return ['string', 'integer', 'number', 'boolean'].includes(name);
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export class MBFormField extends LitElement {
    constructor(schema, data) {
        super();
        this.index = 0;
        this.required = false;
        this.valid = false;
        this.name = '_dummy_';
        this.data = { _dummy_: data };
        this.schema = schema;
    }
    render() {
        return html `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            ${this.renderField()}
            ${this.valid ? html `` : html `<div><p>${this.message}</p></div>`}
        `;
    }
    static get styles() {
        return [css `
            input:invalid {
                border-color: rgba(220,53,69);
            }
            input:invalid:focus {
                box-shadow:0 0 0 .25rem rgba(220,53,69,.25);
                border-color: red;
            }
            input:valid {
                border-color: rgba(25,135,84);
            }
            input:valid:focus {
                box-shadow:0 0 0 .25rem rgba(25,135,84,.25);
                border-color: green;
            }
            p {
                margin:0;
                text-align: right;
                font-size:small;
                font-style: italic;
                color: rgba(220,53,69)
            }
        `];
    }
    connectedCallback() {
        super.connectedCallback();
    }
    firstUpdated(_changedProperties) {
        var _a;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', (evt) => {
            if (/^F\d+$/.test(evt.key)) {
                if (evt.key === 'F9') {
                    console.log(`name=${this.name}\ndata=${JSON.stringify(this.data, null, 4)}\nvalue=${this.value}\n$schema=${JSON.stringify(this.schema, null, 4)}`);
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                }
            }
        });
    }
    update(changedProperties) {
        var _a;
        super.update(changedProperties);
        this.valid = (_a = this.input) === null || _a === void 0 ? void 0 : _a.checkValidity();
    }
    get label() {
        var _a;
        return this.isItem ? this.index : (_a = this.schema.description) !== null && _a !== void 0 ? _a : this.name;
    }
    get isItem() {
        return Array.isArray(this.data);
    }
    get isProperty() {
        return !this.isItem;
    }
    get input() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('input');
    }
    get message() {
        var _a;
        return this.valid ? '' : (_a = this.input) === null || _a === void 0 ? void 0 : _a.validationMessage;
    }
    get validitymap() {
        const map = { 'is-invalid': !this.valid, 'is-valid': this.valid };
        console.log(map);
        return map;
    }
    isRequired(name, schema = this.schema) {
        var _a;
        return !!((_a = schema.required) === null || _a === void 0 ? void 0 : _a.includes(name));
    }
    isEnum(schema) {
        switch (true) {
            case typeof schema.type != 'string': return false;
            case !isbasic(schema.type): return false;
            case !!schema.enum: return true;
            case schema.oneOf && schema.oneOf.every((sch) => isbasic(typeof sch.const)): return true;
            case schema.anyOf && schema.anyOf.every((sch) => isbasic(typeof sch.const)): return true;
        }
        return false;
    }
    default(schema, required) {
        switch (true) {
            case isbasic(schema.type) && required && 'default' in schema:
                return schema.default;
            case isbasic(schema.type):
                return null;
            case schema.type === 'object':
                return Object.keys(schema.properties).reduce((obj, property) => obj[property] = this.default(schema.properties[property], this.isRequired(property, schema)), {});
            case schema.type === 'array' && schema.minItems:
                return Array.from(Array(schema.minItems).keys()).map(this.default(schema.items, true));
            case schema.type === 'array':
                return [];
            default: return null;
        }
    }
    change() {
        var _a, _b;
        this.value = ((_a = this.input) === null || _a === void 0 ? void 0 : _a.valueAsNumber) ? this.input.valueAsNumber : this.input.value;
        this.valid = (_b = this.input) === null || _b === void 0 ? void 0 : _b.checkValidity();
    }
    renderItem(nameorindex) {
        let name, index, schema, required;
        if (typeof nameorindex === 'string') {
            name = nameorindex;
            index = undefined;
            schema = this.schema.properties[nameorindex];
            required = this.isRequired(name);
        }
        else {
            name = undefined;
            index = nameorindex;
            schema = this.schema.items;
            required = false;
        }
        if (this.isEnum(schema)) {
            return html `<mb-form-enum .schema="${schema}" .name="${name}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-enum><br>`;
        }
        switch (schema.type) {
            case "string":
                switch (schema.format) {
                    case "date": return html `<mb-form-date .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-date><br>`;
                    case "time": return html `<mb-form-time .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-time><br>`;
                    case "date-time": return html `<mb-form-datetime .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-datetime><br>`;
                    default: return html `<mb-form-string .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-string><br>`;
                }
            case "boolean": return html `<mb-form-boolean .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-boolean><br>`;
            case "number": return html `<mb-form-number .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-number><br>`;
            case "integer": return html `<mb-form-integer .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-integer><br>`;
            case "array": return html `<mb-form-array .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-array><br>`;
            case "object": return html ` <mb-form-object .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-object>`;
            default: return html `<div class="alert alert-warning" role="alert">field type ${schema.type} not implemented in object field!</div>`;
        }
    }
    dropItem() {
        const event = new CustomEvent('remove-item', { detail: this.index, composed: true });
        this.dispatchEvent(event);
    }
    arrayAppend(index) {
        return html `
            ${index !== undefined
            ? html `<div class="input-group-append"> <span class="btn btn-secondary input-group-text" @click="${this.dropItem}" >x</span></div>`
            : html ``}`;
    }
    get value() {
        switch (true) {
            case this.data === undefined: return null;
            case Array.isArray(this.data) && this.index >= 0 && this.index < this.data.length:
                return this.data[this.index];
            case Array.isArray(this.data):
                return undefined;
            case this.name in this.data:
                return this.data[this.name];
        }
        return null;
    }
    set value(val) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = val;
    }
}
__decorate([
    property({ type: Object })
], MBFormField.prototype, "schema", void 0);
__decorate([
    property({ type: Object })
], MBFormField.prototype, "data", void 0);
__decorate([
    property({ type: String })
], MBFormField.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], MBFormField.prototype, "index", void 0);
__decorate([
    property({ type: Boolean })
], MBFormField.prototype, "required", void 0);
__decorate([
    property({ attribute: false })
], MBFormField.prototype, "valid", void 0);
//# sourceMappingURL=mb-form-field.js.map