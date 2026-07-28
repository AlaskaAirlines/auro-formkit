import { useState } from "react";
import { Select } from "../components/ui/auro-select";

const CITIES = [
  { value: "sea", label: "Seattle" },
  { value: "pdx", label: "Portland" },
  { value: "anc", label: "Anchorage", disabled: true },
  { value: "sfo", label: "San Francisco" },
];

export default function AuroSelectNative() {
  const [city, setCity] = useState("sea");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      <h1>Auro Select (typed React, copied via CLI)</h1>

      <section data-testid="controlled">
        <Select value={city} onValueChange={setCity} options={CITIES} />
        <p>value: {city}</p>
      </section>

      <section data-testid="uncontrolled">
        <Select
          defaultValue="pdx"
          placeholder="Pick a city"
          options={CITIES}
          onValueChange={(v) => console.log("changed:", v)}
        />
      </section>

      <section data-testid="placeholder">
        <Select placeholder="Choose a destination" options={CITIES} />
      </section>

      <section data-testid="disabled">
        <Select disabled placeholder="Disabled" options={CITIES} />
      </section>
    </div>
  );
}
