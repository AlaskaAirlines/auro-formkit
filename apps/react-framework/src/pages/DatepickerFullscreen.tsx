import '@aurodesignsystem/auro-formkit/auro-datepicker';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'auro-datepicker': React.HTMLAttributes<HTMLElement>;
    }
  }
}

export default function DatepickerFullscreen() {
  return (
    <div style={{ padding: '16px' }}>
      <auro-datepicker id="datepicker">
        <span slot="fromLabel">Departure</span>
      </auro-datepicker>
      <button id="outside">Outside</button>
    </div>
  );
}
