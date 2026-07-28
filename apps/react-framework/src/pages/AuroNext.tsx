import { useState } from "react";
import { Checkbox } from "../components/ui/auro-checkbox";
import { Select } from "../components/ui/auro-select";
import { Combobox } from "../components/ui/auro-combobox";

const CITIES = [
  { value: "sea", label: "Seattle" },
  { value: "pdx", label: "Portland" },
  { value: "anc", label: "Anchorage", disabled: true },
  { value: "sfo", label: "San Francisco" },
  { value: "lax", label: "Los Angeles" },
  { value: "jfk", label: "New York" },
];

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1.25rem",
  border: "1px solid #e5e7eb",
  borderRadius: "0.5rem",
  background: "#fafafa",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  flexWrap: "wrap",
};

const labelStyle: React.CSSProperties = {
  width: "10rem",
  flexShrink: 0,
  fontSize: "0.8125rem",
  color: "#6b7280",
};

export default function AuroNext() {
  const [agreed, setAgreed] = useState(false);
  const [selectedCity, setSelectedCity] = useState("sea");
  const [comboCity, setComboCity] = useState("sea");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", maxWidth: "48rem" }}>

      <header>
        <h1 style={{ margin: "0 0 0.25rem" }}>Auro Next</h1>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
          React-first, typesafe components — headless core + thin render layer,
          copied into your repo via <code>auro add</code>.
        </p>
      </header>

      {/* ── Checkbox ── */}
      <section>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Checkbox</h2>
        <div style={sectionStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>controlled</span>
            <Checkbox checked={agreed} onCheckedChange={setAgreed}>
              I agree to the terms
            </Checkbox>
            <code style={{ fontSize: "0.75rem" }}>{String(agreed)}</code>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>uncontrolled</span>
            <Checkbox defaultChecked onCheckedChange={(c) => console.log("checkbox:", c)}>
              Subscribe to updates
            </Checkbox>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>indeterminate</span>
            <Checkbox checked="indeterminate">Select all</Checkbox>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>disabled</span>
            <Checkbox disabled checked>Disabled, checked</Checkbox>
          </div>
        </div>
      </section>

      {/* ── Select ── */}
      <section>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Select</h2>
        <div style={sectionStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>controlled</span>
            <Select value={selectedCity} onValueChange={setSelectedCity} options={CITIES} />
            <code style={{ fontSize: "0.75rem" }}>{selectedCity}</code>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>uncontrolled</span>
            <Select defaultValue="pdx" options={CITIES} onValueChange={(v) => console.log("select:", v)} />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>placeholder</span>
            <Select placeholder="Choose a destination" options={CITIES} />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>disabled</span>
            <Select disabled placeholder="Disabled" options={CITIES} />
          </div>
        </div>
      </section>

      {/* ── Combobox ── */}
      <section>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Combobox</h2>
        <div style={sectionStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>controlled</span>
            <Combobox value={comboCity} onValueChange={setComboCity} options={CITIES} />
            <code style={{ fontSize: "0.75rem" }}>{comboCity}</code>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>uncontrolled</span>
            <Combobox defaultValue="pdx" placeholder="Search cities" options={CITIES} onValueChange={(v) => console.log("combobox:", v)} />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>placeholder</span>
            <Combobox placeholder="Type to filter…" options={CITIES} />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>disabled</span>
            <Combobox disabled placeholder="Disabled" options={CITIES} />
          </div>
        </div>
      </section>

    </div>
  );
}
