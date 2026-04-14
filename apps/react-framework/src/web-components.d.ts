// Central JSX type declarations for Auro Design System web components.
// Uses declare module 'react' augmentation (correct mechanism for react-jsx
// transform) so all pages in this project see auro web component JSX types
// without each file needing its own declare global block.
//
// Base type is DetailedHTMLProps (= ClassAttributes & HTMLAttributes) so that
// 'ref' and 'key' are included -- required for correct React 19 typing.

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type WC = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // ── auro-combobox ──────────────────────────────────────────────
      'auro-combobox': WC & {
        value?: string;
        behavior?: string;
        typedValue?: string;
        appearance?: string;
        noFilter?: boolean | '';
        persistInput?: boolean | '';
        required?: boolean | '';
        autocomplete?: string;
        setCustomValidityValueMissing?: string;
        dvInputOnly?: boolean | '';
        size?: string;
        shape?: string;
        layout?: string;
        fullscreenBreakpoint?: string;
        noFlip?: boolean | '';
      };

      // ── auro-select ───────────────────────────────────────────────
      'auro-select': WC & {
        value?: string;
        multiselect?: boolean;
      };

      // ── auro-menu ─────────────────────────────────────────────────
      'auro-menu': WC & {
        loading?: boolean | '';
        hasLoadingPlaceholder?: boolean | '';
      };

      // ── auro-menuoption ───────────────────────────────────────────
      'auro-menuoption': WC & {
        value?: string;
        static?: boolean | '';
        nomatch?: boolean | '';
      };

      // ── auro-counter / auro-counter-group ─────────────────────────
      'auro-counter': WC & {
        value?: number | string;
        min?: number | string;
        max?: number | string;
        name?: string;
      };
      'auro-counter-group': WC & {
        isDropdown?: boolean | '';
        min?: string | number;
        max?: string | number;
      };

      // ── auro-datepicker ───────────────────────────────────────────
      'auro-datepicker': WC & {
        value?: string;
        valueEnd?: string;
        range?: boolean | '';
        mobileFriendly?: boolean | '';
        centralDate?: string;
      };

      // ── auro-icon ─────────────────────────────────────────────────
      'auro-icon': WC & {
        category?: string;
        name?: string;
      };
    }
  }
}
