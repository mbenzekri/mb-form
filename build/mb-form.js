var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement, property, customElement } from "lit-element";
import "./mb-form-object";
/**
 * @prop schema
 * @prop data
 */
let MBForm = class MBForm extends LitElement {
    constructor() {
        super();
        this._schema = { type: 'object', properties: [] };
        this.obj = { content: {} };
        this.confirmlabel = "Ok";
        this.cancellabel = "Cancel";
    }
    get schema() { return this._schema; }
    set schema(value) {
        this._schema = value;
        this.solveref(this._schema);
    }
    get data() { return this.obj.content; }
    set data(value) {
        this.obj.content = value;
        this.requestUpdate();
    }
    render() {
        if (this._schema.type === 'object')
            return html `
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
                <mb-form-object name="content" .data="${this.obj}" .schema="${this.schema}"></mb-form-object>
                <hr>
                <div class="d-flex justify-content-end">
                    <button type="button"  @click="${this.confirm}" class="btn btn-primary">${this.confirmlabel}</button> 
                    <button type="button"  @click="${this.cancel}" class="btn btn-danger">${this.cancellabel}</button>
                </div>
            `;
        return html `<div>Root type json-schema must be object !</div>`;
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
    solveref(schema) {
        if (schema.type === 'object') {
            const properties = this._schema.properties;
            Object.entries(properties).forEach(([propname, propschema]) => {
                if (propschema.$ref) {
                    properties[propname] = this.definition(propschema.$ref);
                }
                this.solveref(properties[propname]);
            });
        }
        if (schema.type === 'array') {
            if (schema.items.$ref) {
                schema.items = this.definition(schema.items.$ref);
            }
            this.solveref(schema.items);
        }
    }
    definition(ref) {
        if (!ref.startsWith("#/definitions/"))
            throw Error(`Solving refs: only '#/definitions/defname' allowed [found => ${ref}]`);
        const defname = ref.split("/")[2];
        const def = this._schema.definitions[defname];
        return def;
    }
};
__decorate([
    property({ attribute: false })
], MBForm.prototype, "obj", void 0);
__decorate([
    property({ type: String })
], MBForm.prototype, "confirmlabel", void 0);
__decorate([
    property({ type: String })
], MBForm.prototype, "cancellabel", void 0);
__decorate([
    property({ type: Object })
], MBForm.prototype, "schema", null);
__decorate([
    property({ type: Object })
], MBForm.prototype, "data", null);
MBForm = __decorate([
    customElement("mb-form")
], MBForm);
export { MBForm };
//# sourceMappingURL=mb-form.js.map