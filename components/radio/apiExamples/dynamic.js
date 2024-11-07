export function dynamicExample() {
  const values = ['Yes', 'No', 'Maybe'];
  const radioGroup = document.getElementById('dynamicExample');

  for (let i = 0; i < values.length; i++) {
    const radio = document.createElement('auro-radio');
    
    radio.id = `dynamicRadio${i}`;
    radio.label = values[i];
    radio.name = 'radioDemo';
    radio.value = values[i];
    radio.textContent = values[i];

    radioGroup.appendChild(radio);
  }
}
