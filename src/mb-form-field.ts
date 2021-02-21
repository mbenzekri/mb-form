/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, css, LitElement, property, TemplateResult } from "lit-element";
export type Pojo = { [key: string]: any }



function isbasic(name: any) {
    if (typeof name !== 'string') return false
    return ['string', 'integer', 'number', 'boolean'].includes(name)
}

export type JSONSchema = Pojo

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
export abstract class MBFormField extends LitElement {

    @property({ type: Object }) schema: JSONSchema
    @property({ type: Object }) data: Pojo
    @property({ type: String }) name: string
    @property({ type: Number }) index = 0
    @property({ type: Boolean }) required = false
    @property({ attribute: false }) valid = false
    constructor(schema: Pojo, data: any) {
        super()
        this.name = '_dummy_'
        this.data = { _dummy_: data }
        this.schema = schema
    }
    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            ${this.renderField()}
            ${this.valid ? html`` : html`<div><p>${this.message}</p></div>`}
        `
    }
    static get styles() {
        return [css`
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
        `]
    }
    connectedCallback() {
        super.connectedCallback()
    }
    firstUpdated(_changedProperties: any) {
        this.input?.addEventListener('keydown', (evt: KeyboardEvent) => {
            if (/^F\d+$/.test(evt.key)) {
                if (evt.key === 'F9') {
                    console.log(`name=${this.name}\ndata=${JSON.stringify(this.data,null,4)}\nvalue=${this.value}\n$schema=${JSON.stringify(this.schema,null,4)}`)
                    evt.preventDefault()
                    evt.stopImmediatePropagation()
                }
            }
        })
    }

    update(changedProperties: Map<string, any>) {
        super.update(changedProperties)
        this.valid = this.input?.checkValidity()
    }

    get label() {
        return this.isItem ? this.index : this.schema.description ?? this.name
    }
    get isItem() {
        return Array.isArray(this.data)
    }
    get isProperty() {
        return !this.isItem
    }
    get input() {
        return (this.shadowRoot?.getElementById('input') as HTMLInputElement)
    }
    get message() {
        return this.valid ? '' : this.input?.validationMessage
    }
    get validitymap() {
        const map = { 'is-invalid': !this.valid, 'is-valid': this.valid }
        console.log(map)
        return map
    }
    isRequired(name: string, schema = this.schema) {
        return !!schema.required?.includes(name)
    }
    isEnum(schema: Pojo) {
        switch (true) {
            case typeof schema.type != 'string': return false
            case !isbasic(schema.type): return false
            case !!schema.enum: return true
            case schema.oneOf && schema.oneOf.every((sch: Pojo) => isbasic(typeof sch.const)): return true
            case schema.anyOf && schema.anyOf.every((sch: Pojo) => isbasic(typeof sch.const)): return true
        }
        return false
    }
    default(schema: Pojo, required: boolean): any {
        switch (true) {
            case isbasic(schema.type) && required && 'default' in schema:
                return schema.default
            case isbasic(schema.type):
                return null
            case schema.type === 'object':
                return Object.keys(schema.properties).reduce(
                    (obj, property) => obj[property] = this.default(schema.properties[property], this.isRequired(property, schema))
                    , {} as Pojo)
            case schema.type === 'array' && schema.minItems:
                return Array.from(Array(schema.minItems).keys()).map(this.default(schema.items, true))
            case schema.type === 'array':
                return []
            default: return null
        }
    }
    change() {
        this.value = this.input?.valueAsNumber ? this.input.valueAsNumber : this.input.value;
        this.valid = this.input?.checkValidity()
    }

    renderItem(nameorindex: string | number): TemplateResult {
        let name: string | undefined, index: number | undefined, schema: Pojo, required: boolean;

        if (typeof nameorindex === 'string') {
            name = nameorindex
            index = undefined
            schema = this.schema.properties[nameorindex]
            required = this.isRequired(name as string)
        } else {
            name = undefined
            index = nameorindex
            schema = this.schema.items
            required = false
        }
        if (this.isEnum(schema)) {
            return html`<mb-form-enum .schema="${schema}" .name="${name}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-enum><br>`
        }
        switch (schema.type) {
            case "string":
                switch (schema.format) {
                    case "date": return html`<mb-form-date .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-date><br>`
                    case "time": return html`<mb-form-time .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-time><br>`
                    case "date-time": return html`<mb-form-datetime .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-datetime><br>`
                    default: return html`<mb-form-string .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-string><br>`
                }
            case "boolean": return html`<mb-form-boolean .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-boolean><br>`
            case "number": return html`<mb-form-number .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-number><br>`
            case "integer": return html`<mb-form-integer .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-integer><br>`
            case "array": return html`<mb-form-array .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-array><br>`
            case "object": return html` <mb-form-object .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-object>`
            default: return html`<div class="alert alert-warning" role="alert">field type ${schema.type} not implemented in object field!</div>`
        }
    }
    dropItem() {
        const event = new CustomEvent('remove-item', { detail: this.index, composed: true })
        this.dispatchEvent(event)
    }
    arrayAppend(index?: number): TemplateResult {
        return html`
            ${index !== undefined
                ? html`<div class="input-group-append"> <span class="btn btn-secondary input-group-text" @click="${this.dropItem}" >x</span></div>`
                : html``
            }`
    }
    get value(): any {
        switch (true) {
            case this.data === undefined: return null
            case Array.isArray(this.data) && this.index >= 0 && this.index < this.data.length:
                return this.data[this.index]
            case Array.isArray(this.data):
                return undefined
            case this.name in this.data:
                return this.data[this.name]
        }
        return null
    }
    set value(val: any) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = val
    }
    abstract renderField(): TemplateResult
}