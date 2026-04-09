import '@aurodesignsystem/auro-formkit/auro-datepicker';

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
