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

let cancelDeleteFolderModal = document.querySelector(
  '#cancelDeleteFolderModal'
);

let current_Id;
let current_Id_forDelete;
let currentFolderName;
let current_breadcrumb_id = "root";

let rootBreadcrumb = document.querySelector('#root')
rootBreadcrumb.addEventListener('click', function () {
  current_breadcrumb_id = 'root';
  document.querySelector('.inner-folder-container').innerHTML = ``;
  createFolders();
  searchFn(searchBar.value);

  breadcrumbs_list = document.querySelectorAll('.rootBox');
  breadcrumbs_list.forEach((e) => {
    if (e.id != 'root') {
      // console.log('Breadcrumb removal');
      // console.log(e.parentElement);
      e.parentElement.remove();
    }
  });
})


createBtn.addEventListener('click', function () {
  addFolderModal.style.display = 'block';
});
canceladdFolderModal.addEventListener('click', function () {
  addFolderModal.style.display = 'none';
});

// localStorage.setItem('data', JSON.stringify([]));
createFolderBtn.addEventListener('click', (e) => {
  let inputBox = document.querySelector('#createFolderInput');

  let folderName = inputBox.value;

  let arrData = [];
  // console.log();
  if (!JSON.parse(localStorage.getItem('data')) || JSON.parse(localStorage.getItem('data')).length == 0) {
    let obj = {
      id: uid(),
      folderName: folderName,
      children: [],
    };

    localStorage.setItem('data', JSON.stringify([obj]));
  } else {
    let folderListObj = localStorage.getItem('data');
    // console.log(folderListObj);

    let breadcrumb = document.querySelectorAll('.rootBox');
    // console.log("list of breadcrumbs", breadcrumb)
    breadcrumb.forEach((e) => {
      // console.log(e.id + " " + current_breadcrumb_id);
      if (e.id.trim() == current_breadcrumb_id.trim()) {
        //  For Inside Folder
        // console.log("Check repitition", e.id.trim(), current_breadcrumb_id.trim());
        abc(current_breadcrumb_id, folderListObj);
      }

    });
  }

  inputBox.value = '';
  addFolderModal.style.display = 'None';
  createFolders();
  searchFn(searchBar.value);
  
});
function abc(current_breadcrumb_id, folderListObj) {
  counter = 0

  let dataArr = JSON.parse(folderListObj);
  // console.log(childArr);

  dataArr.forEach((e) => {
    // let childArr = dfsExt(current_breadcrumb_id, dataArr);
    // console.log("Children:",childArr);
    // console.log("Breaadcrumb", current_breadcrumb_id, "E id", e.id);
    // console.log("E id",e.id);
    // if (e.id == current_breadcrumb_id) {
    //   // console.log("Inside folders", e.id, current_breadcrumb_id);
    //   let inputBox = document.querySelector('#createFolderInput');
    //   // console.log('not root');
    //   let folderName = inputBox.value;

    //   let childrenArr = e.children;
    //   let newId = uid();
    //   let obj = {
    //     id: newId,
    //     folderName: folderName,
    //     children: [],
    //   };
    //   childrenArr.push(obj);

    //   e.children = childrenArr;
    //   localStorage.setItem('data', JSON.stringify(dataArr));


    // }
    // else 
    if (current_breadcrumb_id.trim() == 'root' && counter == 0) {
      // console.log(counter, e.id, current_breadcrumb_id);
      counter++;
      //work inside root directory
      let inputBox = document.querySelector('#createFolderInput');
      // console.log('Working inside root');
      let folderName = inputBox.value;
      let newId = uid();
      let obj = {
        id: newId,
        folderName: folderName,
        children: [],
      };

      dataArr.push(obj);
      localStorage.setItem('data', JSON.stringify(dataArr));
    }

    dfsStoreExt(e, current_breadcrumb_id, dataArr)

  });
}

cancelEditFolderModal.addEventListener('click', function () {
  editFolderModal.style.display = 'none';
});
editFolderBtn.addEventListener('click', () => {
  editFolderModal.style.display = 'none';
});

editFolderBtn.addEventListener('click', (e) => {
  let dataArr = JSON.parse(localStorage.getItem('data'));


  if (current_breadcrumb_id == 'root') {
    dataArr.forEach((element) => {
      if (element.id == current_Id) {
        element.folderName = editFolderInput.value;
      }
    });
  }
  else {
    let childArr = dfsExt(current_breadcrumb_id, dataArr)
    // console.log(childArr, current_Id);
    childArr.forEach((element) => {
      // console.log(element.id, current_Id);
      if (element.id == current_Id) {
        element.folderName = editFolderInput.value
      }
    });
  }

  localStorage.setItem('data', JSON.stringify(dataArr));

  createFolders();
  searchFn(searchBar.value);
});

createFolders();
function createFolders() {
  breadcrumb_flag = false
  let dataArr = JSON.parse(localStorage.getItem('data'));
  childArr = []
  childArr = dfsExt(current_breadcrumb_id, dataArr);

  // console.log("Create folders:",childArr);
  document.querySelector('.inner-folder-container').innerHTML = '';
  let newArr;
  // console.log(childArr);
  if (current_breadcrumb_id == 'root') {
    // console.log('Going in root else');
    newArr = dataArr;
  }
  else if (childArr) {
    newArr = childArr;
  }
  else {
    newArr = []
  }

  if (newArr) {
    // console.log(newArr);
    newArr.forEach((e) => {
      let div = document.createElement('div');
      div.classList.add('folderBox');
      div.id = e.id;
      div.innerHTML = `
         <div class="editBox">
                <div><span class="material-icons-outlined editIcon" id="${e.id}"> edit </span></div>
                <div><span class="material-icons-outlined deleteIcon" id="${e.id}"> close </span></div>
              </div>
              <div class="folderIcon">
                <span class="material-icons"> folder </span>
              </div>
              <div class="folderName"> ${e.folderName}</div>
  `;

      document.querySelector('.inner-folder-container').append(div);

      let folderBox = div;
      folderBox.addEventListener('click', () => {
        current_breadcrumb_id = folderBox.id;
        // console.log(folderBox.id);
        document.querySelector('.inner-folder-container').innerHTML = ``;
        // createFolders();
        // clickedToGoInsideFolder_id = folderBox.getAttribute('id')

        breadcrumbs = document.querySelector('.path-container');

        let div = document.createElement('div');
        div.classList.add('rootBox-contianer');
        div.innerHTML = `
  <div class="rootBox" id=${folderBox.id}>${folderBox.children[2].innerText}</div>
  <span class="material-icons-outlined"> chevron_right </span>`;
        div.id = folderBox.id;
        //adding listener to breadcrumbs
        div.addEventListener('click', () => {
          // console.log(div.id);
          current_breadcrumb_id = div.id;
          document.querySelector('.inner-folder-container').innerHTML = ``;
          createFolders();
          searchFn(searchBar.value);
          breadcrumbs_list = document.querySelectorAll('.rootBox')


          breadcrumbs_list.forEach((e) => {
            if (e.id != div.id && e.id != 'root' && breadcrumb_flag == true) {
              // console.log("Breadcrumb removal");
              // console.log(e.parentElement);
              e.parentElement.remove();
            }
            else if (e.id == div.id) {
              breadcrumb_flag = true
            }
          })

        })

        breadcrumbs.append(div);
        createFolders();
        searchFn(searchBar.value);
      });
    });
  }

  let editIcon = document.querySelectorAll('.editIcon');
  editIcon.forEach((e) => {
    e.addEventListener('click', (e) => {
      e.stopPropagation();
      editFolderModal.style.display = 'block';
      current_Id = e.currentTarget.getAttribute('id');




      let dataArr = JSON.parse(localStorage.getItem('data'));

      if (current_breadcrumb_id == 'root') {
        dataArr.forEach((element) => {
          if (element.id == current_Id) {
            editFolderInput.value = element.folderName;
          }
        });
      }
      else {

        let childArr = dfsExt(current_breadcrumb_id, dataArr)
        // console.log(childArr, current_Id);
        childArr.forEach((element) => {
          // console.log(element.id, current_Id);
          if (element.id == current_Id) {
            editFolderInput.value = element.folderName;
          }
        });
      }
    });
  });

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

deleteFolderBtn.addEventListener('click', () => {



  let dataArr = JSON.parse(localStorage.getItem('data'));

  if (current_breadcrumb_id == 'root') {
    let newDataArr = [];
    dataArr.forEach((element) => {
      if (element.id != current_Id_forDelete) {
        newDataArr.push(element);
      }
    });
    localStorage.setItem('data', JSON.stringify(newDataArr));
  }
  else {
    let childArr = dfsExt(current_breadcrumb_id, dataArr)
    let newDataArr = [];
    console.log(childArr);
    childArr.forEach((element, index, object) => {
      console.log(element.id, current_Id_forDelete, index, object);
      if (element.id == current_Id_forDelete) {
        object.splice(index, 1);
      }
    });


    localStorage.setItem('data', JSON.stringify(dataArr));
  }
  createFolders();
  searchFn(searchBar.value);
});

cancelDeleteFolderModal.addEventListener('click', () => {
  deleteFolderModal.style.display = 'none';
});
deleteFolderBtn.addEventListener('click', () => {
  deleteFolderModal.style.display = 'none';
});

searchBar.addEventListener('keyup', function () {
  query = searchBar.value;
  searchFn(query);
});

cancelBox.addEventListener('click', () => {
  searchBar.value = '';
  searchFn('');
});

//function to display and view relevant folders

function searchFn(query) {
  all_folders = document.querySelectorAll('.folderBox');
  let dataArr = JSON.parse(localStorage.getItem('data'));
  
  if(current_breadcrumb_id == 'root'){
    dataArr.forEach((element) => {
      current_folder = document.getElementById(`${element.id}`);
      if (element.folderName.includes(query) || query === '') {
        current_folder.style.display = 'block';
      } else {
        current_folder.style.display = 'none';
      }
    });
  }
  else{

    childArr = dfsExt(current_breadcrumb_id, dataArr)
    childArr.forEach((element) => {
      current_folder = document.getElementById(`${element.id}`);
      if (element.folderName.includes(query) || query === '') {
        current_folder.style.display = 'block';
      } else {
        current_folder.style.display = 'none';
      }
    });
  }

}

// found_children=False
var resultChildArray;
function dfsExt(current_breadcrumb_id, dataArr) {

  if (current_breadcrumb_id == 'root') {
    return;
  }

  dataArr.forEach((e) => {
    // console.log("Searching folder ",e.folderName);
    if (e.id == current_breadcrumb_id) {
      // console.log("Condition matched", e.id,e.folderName, e.children);
      if (!resultChildArray) {
        resultChildArray = e.children
      }
      else if (e.children) {
        resultChildArray = e.children
      }
      // console.log(resultChildArray);
    } else {
      dfsInt(current_breadcrumb_id, e.children);
    }
  });
  // console.log(resultChildArray);
  return resultChildArray;
}

function dfsInt(current_breadcrumb_id, childrenArr) {
  var ansReturn;
  if (childrenArr) {
    childrenArr.forEach((e) => {
      // console.log("Current child:", e.folderName);
      ans = dfsExt(current_breadcrumb_id, childrenArr);
      if (ans) {
        ansReturn = ans
      }
    })
  }
}

function dfsStoreExt(e, current_breadcrumb_id, dataArr) {
  // console.log(e.id == current_breadcrumb_id);
  console.log(e.children, e.children.length, e.id, e.folderName, current_breadcrumb_id);
  if (e.id == current_breadcrumb_id && (e.children.length == 0 || !e.children)) {
    let inputBox = document.querySelector('#createFolderInput');
    console.log("First folder in ", e.folderName);
    let folderName = inputBox.value;
    let newId = uid();
    let obj = {
      id: newId,
      folderName: folderName,
      children: [],
    };
    console.log(e);
    console.log(e.children);
    e.children = [obj]
    console.log(e.children);

    localStorage.setItem('data', JSON.stringify(dataArr));
  }
  else if (e.id == current_breadcrumb_id) {
    let inputBox = document.querySelector('#createFolderInput');
    console.log("New folder in ", e.folderName);
    let folderName = inputBox.value;
    let newId = uid();
    let obj = {
      id: newId,
      folderName: folderName,
      children: [],
    };
    console.log(e);
    console.log(e.children);
    e.children.push(obj)
    console.log(e.children);

    localStorage.setItem('data', JSON.stringify(dataArr));
  }
  else {
    dfsStoreInt(e.children, current_breadcrumb_id, dataArr)
  }
}

function dfsStoreInt(childFolder, current_breadcrumb_id, dataArr) {
  if (childFolder) {
    childFolder.forEach((e) => {
      dfsStoreExt(e, current_breadcrumb_id, dataArr);
    })
  }
}