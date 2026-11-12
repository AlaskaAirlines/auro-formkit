<auro-header level="1" id="overview">Menu: Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="menuRole">Menu role</auro-header>
        <p>The <code>auro-menu</code> component renders with <code>role="listbox"</code>. Each <code>auro-menuoption</code> renders with <code>role="option"</code>. This structure lets screen readers announce the list of options and their states.</p>
      </section>
      <section>
        <auro-header level="2" id="optionStates">Option states</auro-header>
        <p>Menu options tell screen readers their state:</p>
        <ul>
          <li><strong>Selected:</strong> The <code>aria-selected</code> attribute is set to <code>true</code> on each selected option.</li>
          <li><strong>Disabled:</strong> The <code>aria-disabled</code> attribute is set to <code>true</code> on disabled options, including every option in a disabled menu.</li>
          <li><strong>Hidden:</strong> Options with the <code>hidden</code> attribute are removed from the accessible tree.</li>
        </ul>
      </section>
      <section>
        <auro-header level="2" id="keyboardInteraction">Keyboard interaction</auro-header>
        <p>The menu handles these keys:</p>
        <ul>
          <li><strong>Arrow Down / Arrow Up:</strong> Moves the active option.</li>
          <li><strong>Enter:</strong> Selects the active option.</li>
          <li><strong>Tab:</strong> Selects the active option, then focus moves out of the menu.</li>
        </ul>
        <p>See the <auro-hyperlink href="keyboard-behavior">keyboard behavior</auro-hyperlink> page for full details.</p>
      </section>
      <section>
        <auro-header level="2" id="modifierKeys">Modifier keys</auro-header>
        <p>The <strong>Meta</strong> key (Command on macOS, Windows/Super elsewhere) intentionally isn't used as a modifier for menu keyboard shortcuts. On Windows, Linux, and ChromeOS, the operating system intercepts <code>Meta</code> + Arrow combinations for window management, such as window snapping, before the browser receives the event, so any shortcut bound to <code>Meta</code> + Arrow would work only on macOS and silently fail on other platforms.</p>
        <p>To jump to the first or last option in a way that works the same on every platform, use <strong>Home</strong> and <strong>End</strong>, which follow the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" target="_blank">WAI-ARIA Listbox pattern</a>. The menu doesn't handle these keys itself: <code>&lt;auro-select&gt;</code> and <code>&lt;auro-combobox&gt;</code> do.</p>
      </section>
      <section>
        <auro-header level="2" id="multiselect">Multi-select</auro-header>
        <p>When the <code>multiselect</code> attribute is set, the menu gets <code>aria-multiselectable="true"</code>, so screen readers announce that more than one option can be selected. Each option's <code>aria-selected</code> attribute shows whether that option is selected.</p>
      </section>
    </div>
  </div>
</div>
