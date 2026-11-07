<auro-header level="2" id="slots">Slots</auro-header>
<p>The following slots are available on the <code>&lt;auro-select&gt;</code> element.</p>
<auro-header level="3" id="slot-default">(default)</auro-header>
<p>The <code>&lt;auro-menu&gt;</code> that holds the options. Place <code>&lt;auro-menuoption&gt;</code> elements inside it.</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>Label that names the select. Screen readers announce it as the name of the select and of its option list.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Help text shown below the select. An error message replaces it while the select is invalid.</p>
<auro-header level="3" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Text shown after the label when <code>required</code> isn't set, such as a translated "(optional)". Defaults to "(optional)".</p>
<auro-header level="3" id="slot-valueText">valueText</auro-header>
<p>Doesn't currently show its content. To change how the selected value looks, use the <code>displayValue</code> slot instead.</p>
<auro-header level="3" id="slot-displayValue">displayValue</auro-header>
<p>Content shown in the trigger in place of the selected option's text while the bib is closed, such as an icon. Put it inside each <code>&lt;auro-menuoption&gt;</code> with <code>slot="displayValue"</code>, and the select copies the selected option's content here.</p>
<auro-header level="3" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Text screen readers announce for the close button in the fullscreen bib, such as "Close sort options". Defaults to "Close".</p>
<auro-header level="3" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>Headline shown above the options in the fullscreen bib, such as "Sort by".</p>
