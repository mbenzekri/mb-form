var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, css, LitElement, property } from "lit-element";
export function isbasic(name) {
    if (typeof name !== 'string')
        return false;
    return ['string', 'integer', 'number', 'boolean'].includes(name);
}
const valdesc = {
    'badInput': { message: 'valeur incorrecte', attribute: '' },
    'valueMissing': { message: 'obligatoire', attribute: '' },
    'patternMismatch': { message: 'format non respecté (patron=?)', attribute: 'pattern' },
    'tooLong': { message: 'trop long (max=?)', attribute: 'maxlength' },
    'tooShort': { message: 'trop court (min=?)', attribute: 'minlength' },
    'rangeOverflow': { message: 'trop grand (max= ?)', attribute: 'max' },
    'rangeUnderflow': { message: 'trop petit (min=?)', attribute: 'min' },
    'stepMismatch': { message: 'erreur de pas (pas=?)', attribute: 'step' },
    'customError': { message: 'erreur spécialisé', attribute: '' },
    'typeMismatch': { message: 'syntaxe incorrecte', attribute: '' },
};
function message(field) {
    var _a;
    const input = field.input;
    if (field.valid || !input)
        return '';
    const errorkey = Object.keys(valdesc).find(key => input.validity[key]);
    if (!errorkey)
        return '';
    return valdesc[errorkey].attribute ? valdesc[errorkey].message.replace(/\?/, (_a = input.getAttribute(valdesc[errorkey].attribute)) !== null && _a !== void 0 ? _a : '') : valdesc[errorkey].message;
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export class MBFormField extends LitElement {
    constructor(schema, data) {
        super();
        this.index = 0;
        this.required = false;
        this.valid = false;
        this.message = '';
        this.name = '_dummy_';
        this.data = { _dummy_: data };
        this.schema = schema;
    }
    static get styles() {
        return [css `
            .invalid {
                border-color: rgba(220,53,69);
            }
            .invalid:focus, input:out-of-range:focus {
                box-shadow:0 0 0 .25rem rgba(220,53,69,.25);
                border-color: red;
            }
            .valid {
                border-color: rgba(25,135,84);
            }
            .valid:focus {
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
    render() {
        return html `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <div style="padding-top: 5px">${this.renderField()}</div>
            ${this.valid ? html `` : html `<div><p>${this.message}</p></div>`}
        `;
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
        switch (schema.field) {
            case 'mb-form-enum': return html `<mb-form-enum .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-enum>`;
            case 'mb-form-nstate': return html `<mb-form-nstate .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-nstate>`;
            case "mb-form-date": return html `<mb-form-date .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-date>`;
            case "mb-form-time": return html `<mb-form-time .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-time>`;
            case "mb-form-datetime": return html `<mb-form-datetime .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-datetime>`;
            case "mb-form-textarea": return html `<mb-form-textarea .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-textarea>`;
            case "mb-form-string": return html `<mb-form-string .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-string>`;
            case "mb-form-boolean": return html `<mb-form-boolean .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-boolean>`;
            case "mb-form-number": return html `<mb-form-number .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-number>`;
            case "mb-form-integer": return html `<mb-form-integer .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-integer>`;
            case "mb-form-range": return html `<mb-form-range .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-range>`;
            case "mb-form-array": return html `<mb-form-array .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-array>`;
            case "mb-form-object": return html ` <mb-form-object .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-object>`;
            case 'mb-form-error':
            default: return html `<div class="alert alert-warning" role="alert">field name=${name} type ${schema.type}/${schema.field}  not implemented !</div>`;
        }
    }
    renderMandatory(name) {
        return html `
            ${name !== undefined ? html `*` : html ``}
        `;
    }
    arrayAppend(index) {
        return html `
            ${index !== undefined
            ? html `<div class="input-group-append"> <span class="btn btn-secondary input-group-text" @click="${this.dropItem}" >x</span></div>`
            : html ``}`;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    firstUpdated(_changedProperties) {
        var _a;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', (evt) => {
            if (/^F\d+$/.test(evt.key)) {
                if (evt.key === 'F9') {
                    console.log(Object.keys(valdesc).map(key => `${key} = ${this.input.validity[key]}`).join('\n'));
                    console.log(`name=${this.name}\nvalid=${this.valid}\ncheck=${JSON.stringify(this.input.validity)}\ndata=${JSON.stringify(this.data, null, 4)}\nvalue=${this.value}\n$schema=${JSON.stringify(this.schema, null, 4)}`);
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                }
            }
        });
        this.check();
    }
    update(changedProperties) {
        super.update(changedProperties);
    }
    get label() {
        var _a, _b;
        return this.isItem ? this.index : (_b = (_a = this.schema.title) !== null && _a !== void 0 ? _a : this.schema.description) !== null && _b !== void 0 ? _b : this.name;
    }
    get renderLabel() {
        return html `${this.isItem ? html `<span class="badge bg-primary rounded-pill">${this.label}</span>` : html `${this.label}${this.required ? '*' : ''}`}`;
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
    isRequired(name, schema = this.schema) {
        var _a;
        return !!((_a = schema.required) === null || _a === void 0 ? void 0 : _a.includes(name));
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
    dropItem() {
        const event = new CustomEvent('remove-item', { detail: this.index, composed: true });
        this.dispatchEvent(event);
    }
    get value() {
        return this.getValue();
    }
    set value(val) {
        this.check();
        this.setValue(val);
    }
    check() {
        var _a, _b, _c;
        this.valid = (_a = this.input) === null || _a === void 0 ? void 0 : _a.checkValidity();
        this.message = message(this);
        (_b = this.input) === null || _b === void 0 ? void 0 : _b.classList.add(this.valid ? 'valid' : 'invalid');
        (_c = this.input) === null || _c === void 0 ? void 0 : _c.classList.remove(this.valid ? 'invalid' : 'valid');
    }
    get plainValue() {
        if (!this.data)
            return null;
        if (Array.isArray(this.data)) {
            return this.data[this.index];
        }
        else {
            if (!(this.name in this.data))
                this.data[this.name] = null;
            return this.data[this.name];
        }
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
__decorate([
    property({ attribute: false })
], MBFormField.prototype, "message", void 0);
//# sourceMappingURL=mb-form-field.js.map