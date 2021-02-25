/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, html, css } from "lit-element";
import { MBFormField } from "./mb-form-field";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("mb-form-range")
export class MBFormRange extends MBFormField {
    constructor() {
        super({ type: 'integer', minimum: 0, maximum: 10 },5);
    }
    static get styles() {
        return [css`
          input[type=range]::-webkit-slider-runnable-track {
            background: lightgray;
            border: 0.2px solid rgba(1, 1, 1, 0.3);
            border-radius: 25px;
            width: 100%;
            height: 8px;
            cursor: pointer;
          }
          input[type=range]::-webkit-slider-thumb {
            margin-top: -6px;
            width: 20px;
            height: 20px;
            background: rgb(13, 110, 253);
            border: 0.2px solid rgba(1, 1, 1, 0.3);
            border-radius: 10px;
            cursor: pointer;
            -webkit-appearance: none;
          }
          input[type=range]::-moz-range-track {
            background: rgb(13, 110, 253);
            border: 0.2px solid rgba(1, 1, 1, 0.3);
            border-radius: 25px;
            width: 100%;
            height: 15.6px;
            cursor: pointer;
          }
          input[type=range]::-moz-range-thumb {
            width: 16px;
            height: 36px;
            background: #00ffff;
            border: 1px solid #000000;
            border-radius: 3px;
            cursor: pointer;
          }
          input[type=range]::-ms-track {
            background: transparent;
            border-color: transparent;
            border-width: 11.2px 0;
            color: transparent;
            width: 100%;
            height: 15.6px;
            cursor: pointer;
          }
          `]
    }
    renderField() {
        return html`
            <div class="form-group row">
                <label for="input" class="col-sm-3 col-form-label">${this.renderLabel}</label> 
                <div class="col-sm-9">
                    <div class="input-group">
                        <input 
                            class="form-control" 
                            type="range"  
                            id="input" 
                            .value="${this.value}" 
                            @input="${this.change}"
                            .min="${this.min}"
                            .max="${this.max}"
                            step="1"
                            ?required="${this.required}"
                        />
                        <div class="input-group-append" style="max-width:5em" >
                            <span class="input-group-text" >${this.value}</span>
                        </div>
                        ${this.arrayAppend(this.index)}
                    </div>
                </div>
            </div>
        `;
    }
    change() {
        super.change()
        this.requestUpdate()
    }
    get max() {  
        if (this.schema.maximumExclusive && 'maximum' in this.schema) return this.schema.maximum-1
        if ('maximum' in this.schema) return this.schema.maximum
        return ''
    }
    get min() { 
        if (this.schema.minimumExclusive && 'minimum' in this.schema) return this.schema.minimum+1
        if ('minimum' in this.schema) return this.schema.minimum
        return ''
    }
    keypress(event: KeyboardEvent ){
        if (!/[-0123456789]/.test(event.key)) return event.preventDefault();
        if (this.min >= 0 && event.key === '-') return event.preventDefault();
        return
   }
   getValue(): any { return this.plainValue}
   setValue(val: any) {
        let convert
        switch(true) {
            case typeof val === 'string' : 
                convert = parseInt(val)
                break;
            case typeof val === 'number' : 
                convert = Math.floor(val)
                break;
        }
        this.data[Array.isArray(this.data) ? this.index : this.name] = convert
    }

}