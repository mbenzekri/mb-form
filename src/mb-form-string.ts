/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html } from "lit-element";
import {ifDefined} from 'lit-html/directives/if-defined';

import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-string")
export class MBFormString extends MBFormField {
    constructor() {
        super({ type: 'string' }, 'initial string')
    }
    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.label}</label> 
                <div class="col-sm-9">
                    <input id="input" 
                        type="${this.type}" 
                        class="form-control" 
                        placeholder="${this.label}"
                        .value="${this.value}" 
                        @input="${this.change}"
                        @keypress="${this.change}"
                        minlength="${ifDefined(this.minlength)}"
                        maxlength="${ifDefined(this.maxlength)}"
                        pattern="${ifDefined(this.pattern)}"
                        ?required="${this.required}"
                    />
                </div>
            </div>
        `;
    }
    get minlength() { return this.schema.minLength }
    get maxlength() { return this.schema.maxLength }
    get pattern() { return this.schema.pattern }
    get type() { 
        switch(this.schema.format ) {
            case 'color' :return 'color'
            case 'email' : return 'email'
            case 'password' : return 'password'
            case 'uri' :  return 'url'
            default : return 'text'
        }
        // 'month' : HTML5 un contrôle qui permet de saisir un mois et une année (sans fuseau horaire).
        // 'week' : HTML5 un contrôle permettant de saisir une date représentée par un numéro de semaine et une année (sans indication de fuseau horaire        }
        // hidden : un contrôle qui n'est pas affiché mais dont la valeur est envoyée au serveur.
        // file : un contrôle qui permet de sélectionner un fichier. L'attribut accept définit les types de fichiers qui peuvent être sélectionnés.
    }
    
    getValue(): any { return this.plainValue }
    setValue(val: any) {
        this.data[Array.isArray(this.data) ? this.index : this.name] = val.toString()
    }

}