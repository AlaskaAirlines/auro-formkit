export class AuroElement extends LitElement {
    static get properties(): {
        /**
         * Sets the layout the component renders, such as `classic`. Each subclass declares its own valid values and default.
         */
        layout: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
    };
    layout: string;
    render(): any;
}
import { LitElement } from "lit";
