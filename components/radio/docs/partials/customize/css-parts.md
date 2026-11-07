<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-radio-group&gt;</code> and <code>&lt;auro-radio&gt;</code> expose the following parts.</p>
<table>
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>radio-group</code></td>
      <td>The <code>&lt;fieldset&gt;</code> element in the <code>&lt;auro-radio-group&gt;</code> shadow DOM, with <code>role="radiogroup"</code>, that wraps the legend and the radio buttons.</td>
    </tr>
    <tr>
      <td><code>helpText</code></td>
      <td>The help text element below the <code>&lt;auro-radio-group&gt;</code>, which shows the help text or the error message.</td>
    </tr>
    <tr>
      <td><code>radio</code></td>
      <td>The container that wraps the radio button's input and label.</td>
    </tr>
    <tr>
      <td><code>radio-input</code></td>
      <td>The native <code>&lt;input type="radio"&gt;</code> element. It's visually hidden, so styles on this part don't change the visible circle.</td>
    </tr>
    <tr>
      <td><code>radio-label</code></td>
      <td>The <code>&lt;label&gt;</code> element that holds the label text and draws the visible circle.</td>
    </tr>
  </tbody>
</table>
