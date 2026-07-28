import { useState } from "react";
import { Checkbox } from "../components/ui/auro-checkbox";

export default function AuroCheckboxNative() {
  const [agree, setAgree] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      <h1>Auro Checkbox (typed React, copied via CLI)</h1>

      <section data-testid="controlled">
        <Checkbox checked={agree} onCheckedChange={setAgree}>
          I agree to the terms (controlled: {String(agree)})
        </Checkbox>
      </section>

      <section data-testid="uncontrolled">
        <Checkbox defaultChecked onCheckedChange={(c) => console.log("changed:", c)}>
          Subscribe to updates (uncontrolled, default on)
        </Checkbox>
      </section>

      <section data-testid="indeterminate">
        <Checkbox checked="indeterminate">Select all (indeterminate)</Checkbox>
      </section>

      <section data-testid="disabled">
        <Checkbox disabled checked>
          Disabled, checked
        </Checkbox>
      </section>
    </div>
  );
}
