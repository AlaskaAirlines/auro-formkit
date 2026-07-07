export function auroMenuSelectByValueExample() {
  const menu = document.querySelector('#selectByValueMenu');
  const stopsBtn = document.querySelector('#selectByValueStops');
  const durationBtn = document.querySelector('#selectByValueDuration');
  const clearBtn = document.querySelector('#selectByValueClear');

  stopsBtn.addEventListener('click', () => menu.selectByValue('stops'));
  durationBtn.addEventListener('click', () => menu.selectByValue('duration'));
  clearBtn.addEventListener('click', () => menu.selectByValue(undefined));
}
