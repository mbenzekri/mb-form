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
    'tooLong': { message: 'trop long (max=?)', attribute: 'maxlength' },
    'tooShort': { message: 'trop court (min=?)', attribute: 'minlength' },
    'rangeOverflow': { message: 'trop grand (max= ?)', attribute: 'max' },
    'rangeUnderflow': { message: 'trop petit (min=?)', attribute: 'min' },
    'stepMismatch': { message: 'erreur de pas (pas=?)', attribute: 'step' },
    'customError': { message: 'erreur spécialisé', attribute: '' },
    'typeMismatch': { message: 'syntaxe incorrecte', attribute: '' },
}
function message(field: MBFormField) {
    const input = field.input
    if (field.valid || !input) return ''
    const errorkey = Object.keys(valdesc).find(key => (input.validity as any)[key])
    if (!errorkey) return ''
    return valdesc[errorkey].attribute ? valdesc[errorkey].message.replace(/\?/, input.getAttribute(valdesc[errorkey].attribute) ?? '') : valdesc[errorkey].message
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
    abstract renderField(): TemplateResult
    abstract setValue(value: any): void
    abstract getValue(): any

    get plainValue() {
        if (!this.data) return null
        if (Array.isArray(this.data)) {
            return this.data[this.index]
        } else {
            if (!(this.name in this.data)) this.data[this.name] = null
            return this.data[this.name]
        }
    }
    get value(): any {
        return this.getValue()
    }
    set value(val: any) {
        this.check()
        this.setValue(val)
    }

    /**
     * return label for this field
     */
    get label() {
        return this.isItem ? this.index : this.schema.title ?? this.schema.description ?? this.name
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
    focus() {
        this.input?.focus();
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
    /**
     * render method for this field component (call renderField abstract rendering method)
     */
    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <div style="padding-top: 5px">${this.renderField()}</div>
            ${this.valid ? html`` : html`<div><p>${this.message}</p></div>`}
        `
    }
    /**
     * render method for label
     */
    get renderLabel() {
        return html`${this.isItem
            ? html`<span class="badge bg-primary rounded-pill">${this.label}</span>`
            : html`${this.label}${this.required ? '*' : ''}`
            }`
    }

    /**
     * render an item of this field (item is a property of object or element of array)
     * used by composed fields (array or object)
     * @param nameorindex 
     */
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
            case 'mb-form-enum': return html`<mb-form-enum .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-enum>`
            case 'mb-form-nstate': return html`<mb-form-nstate .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-nstate>`
            case "mb-form-date": return html`<mb-form-date .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-date>`
            case "mb-form-time": return html`<mb-form-time .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-time>`
            case "mb-form-datetime": return html`<mb-form-datetime .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-datetime>`
            case "mb-form-textarea": return html`<mb-form-textarea .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-textarea>`
            case "mb-form-string": return html`<mb-form-string .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-string>`
            case "mb-form-boolean": return html`<mb-form-boolean .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-boolean>`
            case "mb-form-number": return html`<mb-form-number .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-number>`
            case "mb-form-integer": return html`<mb-form-integer .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-integer>`
            case "mb-form-range": return html`<mb-form-range .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-range>`
            case "mb-form-array": return html`<mb-form-array .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-array>`
            case "mb-form-object": return html` <mb-form-object .schema="${schema}" .name="${name}" .index="${index}" .data="${this.data[this.isItem ? this.index : this.name]}" ?required="${required}"></mb-form-object>`
            case 'mb-form-error':
            default: return html`<div class="alert alert-warning" role="alert">field name=${name} type ${schema.type}/${schema.field}  not implemented !</div>`
        }
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

    /**
     * return an abstract for a given schema,value pair 
     */
    abstract(schema: Pojo, value: any): string {
        switch (true) {
            case value === null || value === undefined: return 'null'
            case Array.isArray(value):
                return (value as Array<any>)
                    .filter((v: any) => v)
                    .map((v: any) => this.abstract(schema.items, v))
                    .join(', ')
            case typeof value === 'object':
                return Object.keys(schema.properties)
                    .filter((property: string) => value[property])
                    .map((property: string) => this.abstract(schema.properties[property], value[property]))
                    .join(', ')
            default: return value
        }
    }


    default(schema: Pojo): any {
        switch (true) {
            case isbasic(schema.type) && 'default' in schema:
                return schema.default
            case isbasic(schema.type):
                return null
            case schema.type === 'object':
                return Object.keys(schema.properties).reduce(
                    (obj, property) => {
                        obj[property] = this.default(schema.properties[property])
                        return obj
                    }
                    , {} as Pojo)
            case schema.type === 'array' && schema.minItems:
                return Array.from(Array(schema.minItems).keys()).map(this.default(schema.items))
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
    isRequired(name: string, schema = this.schema) {
        return !!schema.required?.includes(name)
    }
    check() {
        this.valid = this.input?.checkValidity()
        this.message = message(this)
        this.input?.classList.add(this.valid ? 'valid' : 'invalid')
        this.input?.classList.remove(this.valid ? 'invalid' : 'valid')
    }
}