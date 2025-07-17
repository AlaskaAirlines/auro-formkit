<script>
  import { AuroSelect } from "@aurodesignsystem/auro-select";
  import { AuroMenu, AuroMenuOption } from "@aurodesignsystem/auro-menu";
    import "@aurodesignsystem/auro-icon";
  AuroSelect.register();
  AuroSelect.register('auro-select-dev');
  AuroMenu.register();
  AuroMenuOption.register();
  import { onMount } from "svelte";

  const selectValue = "cars";

let selectItem = null;
onMount(() => {
	console.log("selectItem", selectItem);
	if (selectItem) {
		console.log("selectItem if", selectItem);
		selectItem.value = selectValue;
	}
});
</script>

<div class="grid grid-cols-2 gap-4 bg-[--ds-basic-color-surface-inverse]">
  <div class="flex flex-col items-center justify-center gap-4 p-8 w-full">

        <button class="bg-white" onclick={() => { selectItem.value = 'hotels'; }}>Set Value</button>
      <auro-select bind:this={selectItem} required ondark={true} layout="snowflake" shape="snowflake">
			<span slot="bib.fullscreen.headline">Bib Headline</span>
			<span slot="label">Select label</span>
			<span slot="helptext">helptext content</span>
			<span slot="placeholder">Placeholder content</span>
			<auro-menu nocheckmark>
				<auro-menuoption value="flights">
					<auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
				</auro-menuoption>
				<auro-menuoption value="cars">
					<auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
				</auro-menuoption>
				<auro-menuoption value="hotels">
					<auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
				</auro-menuoption>
				<auro-menuoption value="packages">
					<auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
				</auro-menuoption>
				<auro-menuoption value="cruises">
					<auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
				</auro-menuoption>
			</auro-menu>
		</auro-select>
    <auro-select-dev required ondark={true} value="flights">
			<span slot="bib.fullscreen.headline">Bib Headline</span>
			<span slot="label">Select label</span>
			<span slot="helptext">helptext content</span>
			<span slot="placeholder">Placeholder content</span>
			<auro-menu nocheckmark>
				<auro-menuoption value="flights">
					<auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
				</auro-menuoption>
				<auro-menuoption value="cars">
					<auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
				</auro-menuoption>
				<auro-menuoption value="hotels">
					<auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
				</auro-menuoption>
				<auro-menuoption value="packages">
					<auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
				</auro-menuoption>
				<auro-menuoption value="cruises">
					<auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
				</auro-menuoption>
			</auro-menu>
		</auro-select-dev>
  </div>
</div>
