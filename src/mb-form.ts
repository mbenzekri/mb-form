/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement, property, customElement } from "lit-element";
export type Pojo = { [key: string]: any }
import { isbasic } from "./mb-form-field";
import "./mb-form-object";
/**
 * @prop schema
 * @prop data
 */
@customElement("mb-form")
export class MBForm extends LitElement {

    private _schema: Pojo = { type: 'object', properties: [] }
    @property({ attribute: false }) obj = { content: {} }
    @property({ type: String }) confirmlabel = "Ok"
    @property({ type: String }) cancellabel = "Cancel"

    @property({ type: Object })
    get schema() { return this._schema }
    set schema(value: Pojo) {
        this._schema = JSON.parse(JSON.stringify(value))
        this.compile()
    }

    @property({ type: Object })
    get data() { return this.obj.content }
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


    compile() {
        /**
         * solveref replace schema defiined by reference ($ref) by the real definition 
         * @param schema shema to solve references
         */
        const solveref = (schema: Pojo) => {
            const properties: { [key: string]: any } = schema.properties
            properties && Object.entries(properties).forEach(
                ([propname, propschema]) => propschema.$ref && (properties[propname] = this.definition(propschema.$ref))
            )
            schema.items && schema.items.$ref && (schema.items = this.definition(schema.items.$ref))
        }
        /**
         * solveenum adds a boolean property 'isenum' true if enumeration detected
         * only basic types may be enums
         * 3 flavors : 
         *      (a) having an "enums" property
         *      (b) having an "oneOf" property with a array of constants
         *      (c) having an "anyOf" property with a array of constants
         * @param schema schema to solve enum state
         * @example {type '...'}
         */
        const solveenum = (schema: Pojo) => {
            schema.isenum = false;
            switch (true) {
                case !isbasic(schema.type): break
                case !!schema.enum:
                case schema.oneOf && schema.oneOf.every((sch: Pojo) => isbasic(typeof sch.const)):
                case schema.anyOf && schema.anyOf.every((sch: Pojo) => isbasic(typeof sch.const)):
                    schema.isenum = true;
                    break
            }
        }
        /**
         * solvetype adds a string property 'field' with the target web component for this schema
         * depending on properties type an isenum (see. solveenum)
         * @param schema shema to solve references
         */
        const solvetype = (schema: Pojo) => {
            if (schema.isenum) return schema.field = 'mb-form-enum'
            switch (schema.type) {
                case 'object': return schema.field = 'mb-form-object'
                case 'array': return schema.field = 'mb-form-array'
                case 'integer': return schema.field = 'mb-form-integer'
                case 'number': return schema.field = 'mb-form-number'
                case 'boolean': return schema.field = 'mb-form-boolean'
                case 'string':
                    switch (schema.format) {
                        case "date": return schema.field = 'mb-form-date'
                        case "time": return schema.field = 'mb-form-time'
                        case "date-time": return schema.field = 'mb-form-datetime'
                    }
                    return schema.field = 'mb-form-string'
            }
            return 'mb-form-error'
        }
        const walk = (schema: Pojo, actions: ((schema: Pojo) => void)[]) => {
            actions.forEach(action => action(schema))
            schema.properties && Object.values(schema.properties as Pojo[]).forEach(
                schema => walk(schema, actions)
            )
            schema.items && walk(schema.items, actions)
        }
        walk(this._schema,[solveref,solveenum,solvetype])
    }




    definition(ref: string) {
        if (!ref.startsWith("#/definitions/")) throw Error(`Solving refs: only '#/definitions/defname' allowed [found => ${ref}]`)
        const defname = ref.split("/")[2];
        const def = this._schema.definitions[defname];
        return def
    }

}