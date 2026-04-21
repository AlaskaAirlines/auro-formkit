<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-dropdown';
</script>

<!-- Default dropdown with chevron -->
<section data-testid="default">
	<auro-dropdown chevron>
		<span slot="trigger">Open dropdown</span>
		<div style="padding: 1rem;">Default bib content</div>
	</auro-dropdown>
</section>

<!-- Disabled dropdown -->
<section data-testid="disabled">
	<auro-dropdown chevron disabled>
		<span slot="trigger">Disabled dropdown</span>
		<div style="padding: 1rem;">Should not see this</div>
	</auro-dropdown>
</section>

<!-- noToggle dropdown -->
<section data-testid="no-toggle">
	<auro-dropdown chevron noToggle>
		<span slot="trigger">No toggle dropdown</span>
		<div style="padding: 1rem;">Stays open on second click</div>
	</auro-dropdown>
</section>

<!-- disableEventShow dropdown -->
<section data-testid="disable-event-show">
	<auro-dropdown chevron disableEventShow>
		<span slot="trigger">Programmatic only</span>
		<div style="padding: 1rem;">Only opens via show()</div>
	</auro-dropdown>
</section>

<!-- disableKeyboardHandling dropdown -->
<section data-testid="disable-keyboard">
	<auro-dropdown chevron disableKeyboardHandling>
		<span slot="trigger">No keyboard handling</span>
		<div style="padding: 1rem;">Keyboard disabled</div>
	</auro-dropdown>
</section>

<!-- noHideOnThisFocusLoss dropdown -->
<section data-testid="no-hide-focus-loss">
	<auro-dropdown chevron noHideOnThisFocusLoss>
		<span slot="trigger">Stays open on focus loss</span>
		<div style="padding: 1rem;">
			<button id="bib-button">Button inside bib</button>
		</div>
	</auro-dropdown>
</section>

<!-- Dropdown with focusable content inside bib -->
<section data-testid="with-bib-content">
	<auro-dropdown chevron>
		<span slot="trigger">Dropdown with buttons</span>
		<div style="padding: 1rem;">
			<button id="bib-link-1">Link 1</button>
			<button id="bib-link-2">Link 2</button>
		</div>
	</auro-dropdown>
</section>

<button id="outside-element">Outside</button>

<!-- Fullscreen dropdown -->
<section data-testid="fullscreen">
	<auro-dropdown chevron fullscreenBreakpoint="sm">
		<span slot="trigger">Fullscreen dropdown</span>
		<div style="padding: 1rem;">Fullscreen content</div>
	</auro-dropdown>
</section>
