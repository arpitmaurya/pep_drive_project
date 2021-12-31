let fileNameInput = document.querySelector('.header_folderName');
let fontFamilyOption = document.querySelector('#fontOption')
let notepadSaveBtn = document.querySelector(".doc-saveButton")

let docBold = document.querySelector('.docBold');
let docItalic = document.querySelector('.docItalic')
let textArea = document.getElementsByTagName('textarea')
let content = document.querySelector('#notepadTextArea') //use .value to get actual content
let docSubSize = document.querySelector('.subSize');
let addSize = document.querySelector('.addSize');
let docFontSize = document.querySelector('.textSizeValue');
let docFontOption = document.querySelector('#fontOption');
let isBoldDoc = true;
let isItalicDoc = true;
let docModal_header_bar = document.querySelector('.docModal-header-bar')
    



















//Listener to open the modal for new document 
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








notepadSaveBtn.addEventListener('click', () => {
    storeNotepadFile()
})


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


function handleOpeningNotepad(fileData){
    docModal.style.display = 'block';
    fileNameInput.value = fileData.fileName + fileData.ext
    content.value = fileData.content
    content.style.fontFamily = fileData.fontFamily
    content.style.fontWeight = fileData.bold
    content.style.fontStyle = fileData.italic
    content.style.fontSize = fileData.fontSize

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
        displayFolders()
    });


    //handle fullscreen toggle
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

}

docModal_header_bar.addEventListener('mousedown', (event) => {
    dragAndDrop(docModal, event);
});

function dragAndDrop(element, event) {
  let shiftX = event.clientX - (element.getBoundingClientRect().left);
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - (shiftX/10) + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };
}