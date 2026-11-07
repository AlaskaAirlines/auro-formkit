import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Design tokens come from the installed package (not the CDN) so tests don't
// depend on network timing or on whatever `@latest` happens to be. The legacy
// tokens define `--ds-grid-breakpoint-*`, which drives fullscreen bib detection.
import '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/CSSCustomProperties.css'
import '@aurodesignsystem/design-tokens/dist/themes/alaska/CSSCustomProperties--alaska.min.css'
import '@aurodesignsystem/auro-formkit/auro-select'
import '@aurodesignsystem/auro-formkit/auro-combobox'
import '@aurodesignsystem/auro-formkit/auro-menu'
import '@aurodesignsystem/auro-formkit/auro-counter'
import '@aurodesignsystem/auro-formkit/auro-checkbox'
import '@aurodesignsystem/auro-formkit/auro-dropdown'
import '@aurodesignsystem/auro-formkit/auro-form'
import '@aurodesignsystem/auro-formkit/auro-input'
import '@aurodesignsystem/auro-formkit/auro-radio'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
