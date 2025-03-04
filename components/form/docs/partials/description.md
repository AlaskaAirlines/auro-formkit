`<auro-form>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) designed to
serve as the base logic for all auro-constructed forms.

It automatically "scrapes" its inner content for any auro form elements, and surfaces
them (along with events) to the parent form element as a JSON object.

