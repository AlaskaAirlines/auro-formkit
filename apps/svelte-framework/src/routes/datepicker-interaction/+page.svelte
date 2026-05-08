<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-datepicker';
</script>

<div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">

	<!-- Default: single-date picker with fixed month -->
	<section data-testid="default">
		<auro-datepicker centralDate="01/15/2025">
			<span slot="fromLabel">Departure</span>
		</auro-datepicker>
	</section>

	<!-- Range: two-date picker for round-trip -->
	<section data-testid="range">
		<auro-datepicker range centralDate="01/15/2025">
			<span slot="fromLabel">Depart</span>
			<span slot="toLabel">Return</span>
		</auro-datepicker>
	</section>

	<!-- Preset: has a value already set, for clear-button tests -->
	<section data-testid="preset">
		<auro-datepicker value="01/10/2025" centralDate="01/15/2025">
			<span slot="fromLabel">Preset</span>
		</auro-datepicker>
	</section>

	<!-- Outside target for click-outside-to-close tests -->
	<button id="outside-element">Outside Element</button>
</div>
