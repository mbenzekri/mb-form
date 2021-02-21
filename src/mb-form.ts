/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement, property, customElement } from "lit-element";
export type Pojo = { [key: string]: any }
import "./mb-form-object";
/**
 * @prop schema
 * @prop data
 */
@customElement("mb-form")
export class MBForm extends LitElement {

    private _schema: Pojo = {type: 'object', properties:[]}
    @property({attribute: false }) obj = {content : {}}
    @property({ type: String }) confirmlabel = "Ok"
    @property({ type: String }) cancellabel = "Cancel"

    @property({ type: Object }) 
    get schema() { return this._schema}
    set schema(value: Pojo) { 
        this._schema = value
        this.solveref(this._schema)
    }

    @property({ type: Object })
    get data() { return this.obj.content}
    set data(value: Pojo) { 
        this.obj.content = value 
        this.requestUpdate()
    }

    constructor() { super() }
    render() {
        if (this._schema.type === 'object')
            return html`
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
                <mb-form-object name="content" .data="${this.obj}" .schema="${this.schema}"></mb-form-object>
                <hr>
                <div class="d-flex justify-content-end">
                    <button type="button"  @click="${this.confirm}" class="btn btn-primary">${this.confirmlabel}</button> 
                    <button type="button"  @click="${this.cancel}" class="btn btn-danger">${this.cancellabel}</button>
                </div>
            `
        return html`<div>Root type json-schema must be object !</div>`
    }
    confirm() {
        const event = new CustomEvent('validate', {
            detail: {
                data: this.data,
                schema: this._schema
            }
        });
        this.dispatchEvent(event);
    }
    cancel() {
        const event = new CustomEvent('cancel', {
            detail: {
                data: this.data,
                schema: this._schema
            }
        });
        this.dispatchEvent(event);
    }

    solveref(schema: Pojo) {
        if (schema.type === 'object') {
            const properties: { [key: string]: any } = this._schema.properties;
            Object.entries(properties).forEach(([propname, propschema]) => {
                if (propschema.$ref) {
                    properties[propname] = this.definition(propschema.$ref);
                }
                this.solveref(properties[propname])
            })
        }
        if (schema.type === 'array') {
            if (schema.items.$ref) {
                schema.items = this.definition(schema.items.$ref);
            }
            this.solveref(schema.items)
        }
    }

    definition(ref: string) {
        if (!ref.startsWith("#/definitions/")) throw Error(`Solving refs: only '#/definitions/defname' allowed [found => ${ref}]`)
        const defname = ref.split("/")[2];
        const def = this._schema.definitions[defname];
        return def
    }

}