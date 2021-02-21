/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, css, LitElement, property, TemplateResult } from "lit-element"

export type Pojo = { [key: string]: any }
export function isbasic(name: any) {
    if (typeof name !== 'string') return false
    return ['string', 'integer', 'number', 'boolean'].includes(name)
}
const valdesc: { [key: string]: { message: string; attribute: string } } = {
    'badInput': { message: 'valeur incorrecte', attribute: '' },
    'valueMissing': { message: 'obligatoire', attribute: '' },
    'patternMismatch': { message: 'format non respecté (patron=?)', attribute: 'pattern' },
    'tooLong': { message: 'trop long (max=?)',  attribute: 'maxlength' },
    'tooShort': { message: 'trop court (min=?)', attribute: 'minlength' },
    'rangeOverflow': { message: 'trop grand (max= ?)', attribute: 'max' },
    'rangeUnderflow': { message: 'trop petit (min=?)',  attribute: 'min' },
    'stepMismatch': { message: 'erreur de pas (pas=?)', attribute: 'step' },
    'customError': { message: 'erreur spécialisé', attribute: '' },
    'typeMismatch': { message: 'syntaxe incorrecte', attribute: '' },
}
function message(field: MBFormField) {
    const input = field.input
    if (field.valid || !input) return ''
    const errorkey = Object.keys(valdesc).find(key => (input.validity as any)[key])
    if (!errorkey)  return ''
    return valdesc[errorkey].attribute ? valdesc[errorkey].message.replace(/\?/,input.getAttribute(valdesc[errorkey].attribute) ?? '') : valdesc[errorkey].message
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export abstract class MBFormField extends LitElement {

    @property({ type: Object }) schema: Pojo
    @property({ type: Object }) data: Pojo
    @property({ type: String }) name: string
    @property({ type: Number }) index = 0
    @property({ type: Boolean }) required = false
    @property({ attribute: false }) valid = false
    @property({ attribute: false }) message = ''
    constructor(schema: Pojo, data: any) {
        super()
        this.name = '_dummy_'
        this.data = { _dummy_: data }
        this.schema = schema
    }
    static get styles() {
        return [css`
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
        `]
    }
    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            ${this.renderField()}
            ${this.valid ? html`` : html`<div><p>${this.message}</p></div>`}
        `
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

        switch (schema.field) {
            case 'mb-form-enum': return html`<mb-form-enum .schema="${schema}" .name="${name}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-enum><br>`
            case "mb-form-date": return html`<mb-form-date .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-date><br>`
            case "mb-form-time": return html`<mb-form-time .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-time><br>`
            case "mb-form-datetime": return html`<mb-form-datetime .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-datetime><br>`
            case "mb-form-string": return html`<mb-form-string .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-string><br>`
            case "mb-form-boolean": return html`<mb-form-boolean .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-boolean><br>`
            case "mb-form-number": return html`<mb-form-number .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-number><br>`
            case "mb-form-integer": return html`<mb-form-integer .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-integer><br>`
            case "mb-form-array": return html`<mb-form-array .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-array><br>`
            case "mb-form-object": return html` <mb-form-object .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.name]}" ?required="${required}"></mb-form-object>`
            case 'mb-form-error':
            default: return html`<div class="alert alert-warning" role="alert">field type ${schema.type}  not implemented in object/array field!</div>`
        }
    }
    arrayAppend(index?: number): TemplateResult {
        return html`
            ${index !== undefined
                ? html`<div class="input-group-append"> <span class="btn btn-secondary input-group-text" @click="${this.dropItem}" >x</span></div>`
                : html``
            }`
    }
    connectedCallback() {
        super.connectedCallback()
    }
    firstUpdated(_changedProperties: any) {
        this.input?.addEventListener('keydown', (evt: KeyboardEvent) => {
            if (/^F\d+$/.test(evt.key)) {
                if (evt.key === 'F9') {
                    console.log(Object.keys(valdesc).map(key => `${key} = ${(this.input.validity as any)[key]}`).join('\n'))
                    console.log(`name=${this.name}\nvalid=${this.valid}\ncheck=${JSON.stringify(this.input.validity)}\ndata=${JSON.stringify(this.data, null, 4)}\nvalue=${this.value}\n$schema=${JSON.stringify(this.schema, null, 4)}`)
                    evt.preventDefault()
                    evt.stopImmediatePropagation()
                }
            }
        })
        this.check()
    }

    update(changedProperties: Map<string, any>) {
        super.update(changedProperties)
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

    isRequired(name: string, schema = this.schema) {
        return !!schema.required?.includes(name)
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


    dropItem() {
        const event = new CustomEvent('remove-item', { detail: this.index, composed: true })
        this.dispatchEvent(event)
    }
    get value(): any {
        return this.getValue()
    }
    set value(val: any) {
        this.check()
        this.setValue(val)
    }
    check() {
        this.valid = this.input?.checkValidity()
        this.message = message(this)
        this.input?.classList.add(this.valid ? 'valid' : 'invalid')
        this.input?.classList.remove(this.valid ? 'invalid' : 'valid')
    }
    abstract renderField(): TemplateResult
    abstract setValue(value: any): void
    abstract getValue(): any
}