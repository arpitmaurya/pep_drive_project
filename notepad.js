menu_multiple_notepad.addEventListener('click', () => {
  menuFileOption.style.display = 'none';
  docModal.style.display = 'block';
  docfileMenuBox.addEventListener('mouseenter', () => {
    docSaveBtn.style.display = 'flex';
    docfileMenuBox.style.backgroundColor = '#dee0e3';
    docSaveBtn.addEventListener('click', () => {
      docSaveBtn.style.display = 'none';
      docfileMenuBox.style.backgroundColor = '';
    });
    docSaveBtn.addEventListener('mouseleave', () => {
      docSaveBtn.style.display = 'none';
      docfileMenuBox.style.backgroundColor = '';
    });
  });

  docClose.addEventListener('click', () => {
    docModal.style.display = 'none';
  });
  let docFullScreen = document.querySelector('.fullscreen');
  let isDocOpen = false;
  docFullScreen.addEventListener('click', () => {
    if (isDocOpen) {
      docModal.style.height = '';
      docModal.style.width = '';
      docModal.style.top = '';
      isDocOpen = false;
    } else {
      docModal.style.height = '100vh';
      docModal.style.width = '100vw';
      docModal.style.top = '0px';
      isDocOpen = true;
    }
  });
});
