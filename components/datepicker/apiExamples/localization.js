export function localizationExample() {
  const localizedDatepicker = document.querySelector("#localizationExample");

  localizedDatepicker.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  console.warn(localizedDatepicker.monthNames);
}
