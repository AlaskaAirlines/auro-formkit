import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
