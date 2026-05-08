import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type WC = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
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

      'auro-select': WC & {
        value?: string;
        multiselect?: boolean;
      };

      'auro-menu': WC & {
        loading?: boolean | '';
        hasLoadingPlaceholder?: boolean | '';
      };

      'auro-menuoption': WC & {
        value?: string;
        static?: boolean | '';
        nomatch?: boolean | '';
      };

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

      'auro-datepicker': WC & {
        value?: string;
        valueEnd?: string;
        range?: boolean | '';
        mobileFriendly?: boolean | '';
        centralDate?: string;
      };

      'auro-icon': WC & {
        category?: string;
        name?: string;
      };
    }
  }
}
