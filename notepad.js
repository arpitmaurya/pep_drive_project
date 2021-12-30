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


let docBold = document.querySelector('.docBold');
let docItalic = document.querySelector('.docItalic')
let textArea = document.getElementsByTagName('textarea')
let docSubSize = document.querySelector('.subSize');
let addSize = document.querySelector('.addSize');
let docFontSize = document.querySelector('.textSizeValue');
let docFontOption = document.querySelector('#fontOption');
let isBoldDoc = true;
let isItalicDoc = true;

docBold.addEventListener('click', () => {
  if (isBoldDoc) {
    isBoldDoc = false
        textArea[0].style.fontWeight = 'bold'; 
  } else {
    isBoldDoc = true
        textArea[0].style.fontWeight = ''; 
  }
})

docItalic.addEventListener('click', () => {
  if (isItalicDoc) {
    isItalicDoc = false;
    textArea[0].style.fontStyle = 'italic';
  } else {
    isItalicDoc = true;
     textArea[0].style.fontStyle = '';
  }
})


docSubSize.addEventListener('click', () => {
  textArea[0].style.fontSize = `${Number(docFontSize.innerHTML) - 1}px`;
  docFontSize.innerHTML = Number(docFontSize.innerHTML) - 1;
})

addSize.addEventListener('click', () => {
   textArea[0].style.fontSize = `${Number(docFontSize.innerHTML) + 1}px`;
   docFontSize.innerHTML = Number(docFontSize.innerHTML) + 1;
})

docFontOption.addEventListener('change', (e) => {
   textArea[0].style.fontFamily = e.target.value
})