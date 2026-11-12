/**
 * Shared base class for layout-aware Auro form components, such as `auro-input`, `auro-select`, and `auro-menu`.
 *
 * It declares the `onDark` property and provides helpers that apply the
 * `layout-*` and `shape-*` classes for the current `layout`, `shape`, and `size`
 * to the subclass's `.wrapper` element. Subclasses declare the `layout`,
 * `shape`, and `size` properties they use, each with its own values and
 * default. The base `render()` calls `renderLayout()`, which a subclass
 * implements unless it overrides `render()`.
 *
 * **Key capabilities**
 * - **Layout and shape classes**: The base class updates the `.wrapper` element's `layout-*` and `shape-*` classes whenever `layout`, `shape`, or `size` changes, unless a subclass overrides `updated()` without calling `super.updated()`.
 * - **Dark background flag**: `ondark` tells a subclass that the component sits on a dark background, so the subclass can switch colors.
 *
 * **Example**
 * ```js
 * class MyField extends AuroElement {
 *   renderLayout() {
 *     return html`<div class="wrapper"><slot></slot></div>`;
 *   }
 * }
 * ```
 */
export class AuroElement extends LitElement {
    static get properties(): {
        /**
         * Tells a subclass that the component sits on a dark background, so the subclass can switch colors. The base class doesn't change any styles itself, and `auro-menu` and `auro-menuoption` don't currently use it.
         * @category ui
         */
        onDark: {
            type: BooleanConstructor;
            attribute: string;
            reflect: boolean;
        };
    };
    /**
     * Checks whether the element or anything inside it has focus.
     * @private
     * @returns {boolean} True if the element or one of its descendants has focus; false otherwise.
     */
    private get componentHasFocus();
    /**
     * Sets the `shape-*` class on the `.wrapper` element to match the current `shape` and `size`, such as `shape-rounded-lg`, or to `shape-none` when either isn't set. Does nothing when there's no `.wrapper` element.
     * @returns {void}
     */
    resetShapeClasses(): void;
    /**
     * Sets the `layout-*` class on the `.wrapper` element to match the current `layout`, such as `layout-classic`. Does nothing when `layout` isn't set or there's no `.wrapper` element.
     * @returns {void}
     */
    resetLayoutClasses(): void;
    /**
     * Updates the `layout-*` and `shape-*` classes on the `.wrapper` element. Called whenever `layout`, `shape`, or `size` changes, unless a subclass overrides `updated()` without calling `super.updated()`.
     * @returns {void}
     */
    updateComponentArchitecture(): void;
    updated(changedProperties: any): void;
    render(): any;
}
import { LitElement } from "lit";
