<!--
The index.md file is a compiled document. No edits should be made directly to this file.
README.md is created by running `npm run build:docs`.
This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Radio

<auro-radio-group>
  <span slot="legend">Accordion Test</span>
  <auro-radio id="basicGroupRadio1" label="Credit or debit card" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="Apple Pay" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="Alaska Airlines Commercial Account" name="radioDemo" value="no"></auro-radio>
  <div>
    <auro-accordion>
      <span slot="trigger">More payment options</span>
      <auro-radio id="basicGroupRadio4" label="Click to pay" name="radioDemoA" value="testinga"></auro-radio>
      <auro-radio id="basicGroupRadio4" label="Google Pay" name="radioDemoA" value="testingb"></auro-radio>
    </auro-accordion>
  </div>
</auro-radio-group>








<input type="radio" id="html" name="fav_language" value="HTML">
<label for="html">HTML</label><br>
<auro-accordion>
  <span slot="trigger">More payment options</span>  
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label><br>
</auro-accordion>
<input type="radio" id="javascript" name="fav_language" value="JavaScript">
<label for="javascript">JavaScript</label>