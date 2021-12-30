let createBtn = document.querySelector('#createBtn');
let addFolderModal = document.querySelector('#addFolderModal');
let canceladdFolderModal = document.querySelector('#canceladdFolderModal');
let createFolderBtn = document.querySelector('#createFolderBtn');
let cancelBox = document.querySelector('.cancelBox');

let editFolderModal = document.querySelector('#editFolderModal');
let editFolderInput = document.querySelector('#renameFolderInput');
let cancelEditFolderModal = document.querySelector('#cancelEditFolderModal');
let editFolderBtn = document.querySelector('#editFolderBtn');
let deleteFolderBtn = document.querySelector('#deleteFolderBtn');

let deleteFolderModal = document.querySelector('#deleteFolderModal');

let searchBar = document.querySelector('#searchBar');

let menuFileOption = document.querySelector('.menu-FileOption');
let menu_multiple_notepad = document.querySelector('.menu-multiple-box');
let docModal = document.querySelector('#docModal');
let docSaveBtn = document.querySelector('.doc-saveButton');
let docfileMenuBox = document.querySelector('.fileBox');
let docClose = document.querySelector('.close');


let cancelDeleteFolderModal = document.querySelector(
  '#cancelDeleteFolderModal'
);

let current_Id;
let current_Id_forDelete;
let currentFolderName;

// console.log(database);


//Setting a default ID for breadcrumb. This will be updated based on the folder we are traversing
let current_breadcrumb_id = 'root';

//Handling click on "My Drive" breadcrumb
let rootBreadcrumb = document.querySelector('#root');
rootBreadcrumb.addEventListener('click', function () {
  current_breadcrumb_id = 'root';
  document.querySelector('.inner-folder-container').innerHTML = ``; //Empty out the body
  displayFolders();
  searchFn(searchBar.value); //Added the function to handle pre-existing text in search bar

  //Add a listener to remove all extra (trailing) breadcrumbs after "My drive"
  breadcrumbs_list = document.querySelectorAll('.rootBox');
  breadcrumbs_list.forEach((e) => {
    if (e.id != 'root') {
      // console.log('Breadcrumb removal');
      // console.log(e.parentElement);
      e.parentElement.remove();
    }
  });
});

//Listener to close the Create Folder modal
canceladdFolderModal.addEventListener('click', function () {
  addFolderModal.style.display = 'none';
});

createFolderBtn.addEventListener('click', (e) => {
  createFolderFunction(); //Function to create a folder and store it in LocalStorage on clicking Okay
});

//Enable creation of a folder with Enter key
document.querySelector('#createFolderInput').addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    createFolderFunction();
  }
});

function createFolderFunction() {
  //Function to create a folder
  let inputBox = document.querySelector('#createFolderInput');

  let folderName = inputBox.value; //get the user-entered folder name

  let arrData = [];

  //condition to handle the case where there is no data at all, or the array is empty
  if (
    !getData() || getData().length == 0
  ) {
    let obj = {
      id: uid(),
      folderName: folderName,
      children: [],
    };

    // localStorage.setItem('data', JSON.stringify([obj]));
    // database.data = [obj]
    setData([obj])

  } else {
    //condition to handle the case where some data exists, and for nesting of folders
    let folderListObj = getData();
    // console.log(folderListObj);
    let breadcrumb = document.querySelectorAll('.rootBox');
    //check for which subfolder to create the new folder in using breadcrumb's ID, which is the same as folder ID. This will be unique for every folder
    breadcrumb.forEach((e) => {
      if (e.id.trim() == current_breadcrumb_id.trim()) {
        //  For inner folders

        storeFolder(current_breadcrumb_id, folderListObj);
      }
    });
  }

  //Empty out the input area and close modal after folder is created
  inputBox.value = '';
  addFolderModal.style.display = 'None';
  displayFolders();
  searchFn(searchBar.value);
}

//Function to search for correct folder using DFS and storing it in LocalStorage
function storeFolder(current_breadcrumb_id, folderListObj) {
  counter = 0; //Placed a counter to handle repeated folder creation

  // let dataArr = JSON.parse(folderListObj);
  let dataArr = folderListObj;


  //Handle creation of folder in the root directory
  dataArr.forEach((e) => {
    if (current_breadcrumb_id.trim() == 'root' && counter == 0) {
      counter++;
      //work inside root directory
      let inputBox = document.querySelector('#createFolderInput');

      let folderName = inputBox.value;
      let newId = uid();
      let obj = {
        id: newId,
        folderName: folderName,
        children: [],
      };

      dataArr.push(obj);
      // localStorage.setItem('data', JSON.stringify(dataArr));
      // database.data = dataArr
      setData(dataArr)
    }
    //Handle creation of folder inside a sub-folder
    dfsStoreExt(e, current_breadcrumb_id, dataArr);
  });
}

//To close Edit Folder name modal
cancelEditFolderModal.addEventListener('click', function () {
  editFolderModal.style.display = 'none';
});

//CLose modal automatically after renaming and clicking OK button
editFolderBtn.addEventListener('click', () => {
  editFolderModal.style.display = 'none';
});

//Handle folder renaming upon clicking OK
editFolderBtn.addEventListener('click', () => {
  editFolderName();
});

//Handle folder renaming upon pressing Enter
editFolderInput.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    editFolderModal.style.display = 'none';
    editFolderName();
  }
});

//Handle renaming Folder Name
function editFolderName() {
  // let dataArr = JSON.parse(localStorage.getItem('data'));
  // let dataArr = database.data
  let dataArr = getData()
  if (current_breadcrumb_id == 'root') {
    //Renaming in root. Simple Linear Search
    dataArr.forEach((element) => {
      if (element.id == current_Id) {
        element.folderName = editFolderInput.value;
      }
    });
  } else {
    //Renaming inside sub-folders. Apply DFS to search for the proper object to update it's folderName property
    let childArr = dfsExt(current_breadcrumb_id, dataArr);
    //Linear search inside correct cub-folder's children array to search for the folder to be renamed
    childArr.forEach((element) => {
      if (element.id == current_Id) {
        element.folderName = editFolderInput.value;
      }
    });
  }
  // localStorage.setItem('data', JSON.stringify(dataArr));
  // database.data = dataArr
  setData(dataArr)

  //re-display the updated folder details
  displayFolders();
  searchFn(searchBar.value);
}

displayFolders(); //Calling it by default at the beginning of the process to display all folders in the root directory
function displayFolders() {
  breadcrumb_flag = false;
  // let dataArr = JSON.parse(localStorage.getItem('data'));
  // let dataArr = database.data
  let dataArr = getData()

  childArr = [];
  childArr = dfsExt(current_breadcrumb_id, dataArr); //Search for the folders in the current directory to find the children objects, which will be displayed on the screen

  document.querySelector('.inner-folder-container').innerHTML = '';
  let newArr;

  if (current_breadcrumb_id == 'root') {
    //set appropriate data to display folders in the root directory
    newArr = dataArr;
  } else if (childArr) {
    //set approp data to to display the required sub-folder
    newArr = childArr;
  } else {
    newArr = [];
  }

  if (newArr) {
    // console.log(newArr);
    newArr.forEach((e) => {
      // ----------------------------------------- TEMPLATING
      let folderTemplate = document.querySelector(
        '#temp-createFolderBox'
      ).content;
      var clone = document.importNode(folderTemplate, true);
      clone.querySelectorAll('.editBox span').forEach((element) => {
        element.setAttribute('id', e.id);
      });
      let folderBox = clone.querySelector('.folderBox');
      folderBox.setAttribute('id', e.id);

      let iconSelector = clone.querySelector('.folderIcon .material-icons')
      
      if(e.folderName){
        clone.querySelector('.folderName').innerText = e.folderName;
        iconSelector.innerHTML="folder"
      }
      else if(e.fileName && e.ext==".txt"){
        clone.querySelector('.folderName').innerText = e.fileName;
        iconSelector.style.fontSize = "65px"
        iconSelector.innerHTML="description"
      }


      // clone.querySelector('.folderName').innerText = e.folderName;
      document.querySelector('.inner-folder-container').appendChild(clone);

      // -------------------------------------------

      //handle Travelling to the folder's contents, and appending breadcrumbs on clicking them using Templates
      folderBox.addEventListener('click', () => {
        current_breadcrumb_id = folderBox.id;

        document.querySelector('.inner-folder-container').innerHTML = ``;

        breadcrumbs_ParentContainer = document.querySelector('.path-container');
        // breadcrumbs = document.querySelector('.path-container');

        let temp_breadCrumb_template =
          document.querySelector('#temp-breadCrumb').content;
        var temp_breadCrumb_clone = document.importNode(
          temp_breadCrumb_template,
          true
        );

        let rootBox_contianer =
          temp_breadCrumb_clone.querySelector('.rootBox-contianer');
        rootBox_contianer.setAttribute('id', folderBox.id);

        let rootBox = temp_breadCrumb_clone.querySelector('.rootBox');
        rootBox.setAttribute('id', folderBox.id);
        rootBox.innerHTML = folderBox.children[2].innerText;

        breadcrumbs_ParentContainer.appendChild(temp_breadCrumb_clone);

        //handle removal of breadcrumbs for non-root folders
        rootBox_contianer.addEventListener('click', () => {
          current_breadcrumb_id = rootBox_contianer.id;
          document.querySelector('.inner-folder-container').innerHTML = ``;
          displayFolders();
          searchFn(searchBar.value);
          breadcrumbs_list = document.querySelectorAll('.rootBox');

          breadcrumbs_list.forEach((e) => {
            if (
              e.id != rootBox_contianer.id &&
              e.id != 'root' &&
              breadcrumb_flag == true
            ) {
              e.parentElement.remove();
            } else if (e.id == rootBox_contianer.id) {
              breadcrumb_flag = true;
            }
          });
        });
        displayFolders();
        searchFn(searchBar.value);
      });
    });
  }
  //add listeners to all Edit buttons
  let editIcon = document.querySelectorAll('.editIcon');
  editIcon.forEach((e) => {
    e.addEventListener('click', (e) => {
      e.stopPropagation();
      editFolderModal.style.display = 'block';
      document.querySelector('#renameFolderInput').focus();
      current_Id = e.currentTarget.getAttribute('id');

      // let dataArr = JSON.parse(localStorage.getItem('data'));
      // let dataArr = database.data
      let dataArr = getData()

      if (current_breadcrumb_id == 'root') {
        //Linear search in case of root folder
        dataArr.forEach((element) => {
          if (element.id == current_Id) {
            editFolderInput.value = element.folderName;
          }
        });
      } else {
        //DFS followed by Linear search for sub-folder
        let childArr = dfsExt(current_breadcrumb_id, dataArr);

        childArr.forEach((element) => {
          // console.log(element.id, current_Id);
          if (element.id == current_Id) {
            editFolderInput.value = element.folderName;
          }
        });
      }
    });
  });

  //Update ID for the folder which is to be deleted
  let deleteIcon = document.querySelectorAll('.deleteIcon');
  deleteIcon.forEach((e) => {
    e.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteFolderModal.style.display = 'block';
      current_Id_forDelete = e.currentTarget.getAttribute('id');
      console.log(current_Id_forDelete);
    });
  });
}

//Delete folder. Linear search for Root folder deletion.
//DFS search for sub-folder deletion
deleteFolderBtn.addEventListener('click', () => {
  // let dataArr = JSON.parse(localStorage.getItem('data'));
  // let dataArr = database.data
  let dataArr = getData()

  if (current_breadcrumb_id == 'root') {
    let newDataArr = [];
    dataArr.forEach((element) => {
      if (element.id != current_Id_forDelete) {
        newDataArr.push(element);
      }
    });
    // localStorage.setItem('data', JSON.stringify(newDataArr));
    // database.data = newDataArr
    setData(newDataArr)
  } else {
    let childArr = dfsExt(current_breadcrumb_id, dataArr);
    let newDataArr = [];
    console.log(childArr);
    childArr.forEach((element, index, object) => {
      console.log(element.id, current_Id_forDelete, index, object);
      if (element.id == current_Id_forDelete) {
        object.splice(index, 1);
      }
    });

    // localStorage.setItem('data', JSON.stringify(dataArr));
    // database.data = dataArr
    setData(dataArr)
  }
  displayFolders();
  searchFn(searchBar.value);
});

//Close delete button modal
cancelDeleteFolderModal.addEventListener('click', () => {
  deleteFolderModal.style.display = 'none';
});

//Delete folder on clicking OK
deleteFolderBtn.addEventListener('click', () => {
  deleteFolderModal.style.display = 'none';
});

//Delete folder on pressing Enter
searchBar.addEventListener('keyup', function () {
  query = searchBar.value;
  searchFn(query);
});

//Empty search bar on clicking 'X'
cancelBox.addEventListener('click', () => {
  searchBar.value = '';
  searchFn('');
});

//search appropriate folder and display relevant results
function searchFn(query) {
  all_folders = document.querySelectorAll('.folderBox');
  // let dataArr = JSON.parse(localStorage.getItem('data'));
  // let dataArr = database.data
  let dataArr = getData()

  if (current_breadcrumb_id == 'root') {
    dataArr.forEach((element) => {
      current_folder = document.getElementById(`${element.id}`);
      if (element.folderName && element.folderName.includes(query) || query === '') {
        current_folder.style.display = 'block';
      } 
       else if(element.fileName && element.fileName.includes(query) || query === ''){
        current_folder.style.display = 'block';
       }
       else{
        current_folder.style.display = 'none';
      }
    });
  } else {
    childArr = dfsExt(current_breadcrumb_id, dataArr);
    childArr.forEach((element) => {
      current_folder = document.getElementById(`${element.id}`);

      if (element.folderName && element.folderName.includes(query) || query === '') {
        current_folder.style.display = 'block';
      } 
       else if(element.fileName && element.fileName.includes(query) || query === ''){
        current_folder.style.display = 'block';
       }
       else{
        current_folder.style.display = 'none';
      }
    });
  }
}

// found_children=False
//To search for the folder using DFS with breadcrumbs as the point of reference
var resultChildArray;
function dfsExt(current_breadcrumb_id, dataArr) {
  if (current_breadcrumb_id == 'root') {
    return;
  }

  dataArr.forEach((e) => {
    if (e.id == current_breadcrumb_id) {
      //If relevant folder has been found

      if (!resultChildArray) {
        //condition put to not let undefined result override the actual result
        resultChildArray = e.children;
      } else if (e.children) {
        //update the children array and return it
        resultChildArray = e.children;
      }
    } else {
      //Search in the child folder
      dfsInt(current_breadcrumb_id, e.children);
    }
  });

  return resultChildArray;
}

function dfsInt(current_breadcrumb_id, childrenArr) {
  var ansReturn;
  if (childrenArr) {
    childrenArr.forEach((e) => {
      // console.log("Current child:", e.folderName);
      ans = dfsExt(current_breadcrumb_id, childrenArr);
      if (ans) {
        ansReturn = ans;
      }
    });
  }
}



//Listener to open the modal to create a folder and highlight text
createBtn.addEventListener('click', function () {
  menuFileOption.style.display = 'flex';
  document
    .querySelector('.menu-createFolderBtn')
    .addEventListener('click', () => {
      menuFileOption.style.display = 'none';
      addFolderModal.style.display = 'block';
      document.querySelector('#createFolderInput').focus();
    });


});

document.querySelector('.content-container').addEventListener('click', () => {
  menuFileOption.style.display = 'none';
});



function storeNewDataInFolder() {

}