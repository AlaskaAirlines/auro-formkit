<p>The following CSS shadow parts are available for styling:</p>
<table>
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>chevron</code></td>
      <td>The container for the icon that shows whether the bib is open. Exists only when <code>chevron</code> is set.</td>
    </tr>
    <tr>
      <td><code>helpText</code></td>
      <td>The help text container. Not currently rendered, so styles set on it have no effect; style the content in the <code>helpText</code> slot instead.</td>
    </tr>
    <tr>
      <td><code>size</code></td>
      <td>A hidden sizing element whose <code>width</code>, <code>height</code>, <code>max-width</code>, and <code>max-height</code> are copied to the bib. Applies only when <code>matchWidth</code> is set.</td>
    </tr>
    <tr>
      <td><code>trigger</code></td>
      <td>The trigger content container. Not currently rendered, so styles set on it have no effect; use <code>wrapper</code> instead.</td>
    </tr>
    <tr>
      <td><code>wrapper</code></td>
      <td>The trigger wrapper element surrounding the trigger content and chevron.</td>
    </tr>
  </tbody>
</table>
