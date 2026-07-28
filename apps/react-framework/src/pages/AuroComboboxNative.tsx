import { useState } from "react";
import { Combobox } from "../components/ui/auro-combobox";

const CITIES = [
  { value: "sea", label: "Seattle" },
  { value: "pdx", label: "Portland" },
  { value: "anc", label: "Anchorage", disabled: true },
  { value: "sfo", label: "San Francisco" },
  { value: "lax", label: "Los Angeles" },
  { value: "jfk", label: "New York" },
];

export default function AuroComboboxNative() {
  const [city, setCity] = useState("sea");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      <h1>Auro Combobox (typed React, copied via CLI)</h1>

      <section data-testid="controlled">
        <Combobox value={city} onValueChange={setCity} options={CITIES} />
        <p>value: {city}</p>
      </section>

      <section data-testid="uncontrolled">
        <Combobox
          defaultValue="pdx"
          placeholder="Search cities"
          options={CITIES}
          onValueChange={(v) => console.log("changed:", v)}
        />
      </section>

      <section data-testid="placeholder">
        <Combobox placeholder="Type to filter…" options={CITIES} />
      </section>

      <section data-testid="disabled">
        <Combobox disabled placeholder="Disabled" options={CITIES} />
      </section>
    </div>
  );
}
