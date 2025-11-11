export const initSelectAllMatchingOptionsExample = () => {

  const selectAllBtn = document.getElementById('selectAllBtn');
  const selectAllMenu = document.getElementById('selectAllMenu');
  const selectFirstBtn = document.getElementById('selectFirstBtn');
  const selectFirstMenu = document.getElementById('selectFirstMenu');
  const resetAllBtn = document.getElementById('resetAllBtn');
  const resetFirstBtn = document.getElementById('resetFirstBtn');

  selectAllBtn.addEventListener('click', () => {
    selectAllMenu.value = 'stops';
  });

  resetAllBtn.addEventListener('click', () => {
    selectAllMenu.reset();
  });

  selectFirstBtn.addEventListener('click', () => {
    selectFirstMenu.value = 'stops';
  });

  resetFirstBtn.addEventListener('click', () => {
    selectFirstMenu.reset();
  });
};
