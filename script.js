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

let searchBar = document.querySelector("#searchBar");

let cancelDeleteFolderModal = document.querySelector(
  '#cancelDeleteFolderModal'
);

let current_Id;
let current_Id_forDelete;
let currentFolderName;

createBtn.addEventListener('click', function () {
  addFolderModal.style.display = 'block';
});
canceladdFolderModal.addEventListener('click', function () {
  addFolderModal.style.display = 'none';
});

createFolderBtn.addEventListener('click', (e) => {
  let inputBox = document.querySelector('#createFolderInput');
  let folderName = inputBox.value;
  let arrData = [];
  let folderListObj = localStorage.getItem('data');
  if (!folderListObj) {
    let obj = {
      id: 0,
      folderName: folderName,
    };
    arrData.push(obj);
    localStorage.setItem('data', JSON.stringify(arrData));
  } else {
    let arrData = JSON.parse(folderListObj);
    let noOfFolders = arrData.length;
    let obj = {
      id: noOfFolders,
      folderName: folderName,
    };
    arrData.push(obj);
    localStorage.setItem('data', JSON.stringify(arrData));
  }
  inputBox.value = '';
  addFolderModal.style.display = 'None';
  createFolders();
});

cancelEditFolderModal.addEventListener('click', function () {
  editFolderModal.style.display = 'none';
});
editFolderBtn.addEventListener('click', () => {});

editFolderBtn.addEventListener('click', (e) => {
  let dataArr = JSON.parse(localStorage.getItem('data'));
  dataArr.forEach((element) => {
    console.log(element.id);
    if (element.id == current_Id) {
      element.folderName = editFolderInput.value;
      console.log(element.folderName);
    }
  });

  console.log(dataArr);
  localStorage.setItem('data', JSON.stringify(dataArr));

  createFolders();
});

createFolders();
function createFolders() {
  document.querySelector('.inner-folder-container').innerHTML = '';
  let newArr = JSON.parse(localStorage.getItem('data'));
 if (newArr) {
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
   });
  }

  let editIcon = document.querySelectorAll('.editIcon');
  editIcon.forEach((e) => {
    e.addEventListener('click', (e) => {
      editFolderModal.style.display = 'block';
      current_Id = e.currentTarget.getAttribute('id');

      let dataArr = JSON.parse(localStorage.getItem('data'));
      dataArr.forEach((element) => {
        if (element.id == current_Id) {
          editFolderInput.value = element.folderName;
        }
      });
    });
  });
 
 
let deleteIcon = document.querySelectorAll('.deleteIcon');
deleteIcon.forEach((e) => {
  e.addEventListener('click', (e) => {
    deleteFolderModal.style.display = 'block';
    console.log('a');
    current_Id_forDelete = e.currentTarget.getAttribute('id');
  });
});
 
 
}


deleteFolderBtn.addEventListener('click', () => {
    let dataArr = JSON.parse(localStorage.getItem('data'));
    let newDataArr = [];
    dataArr.forEach((element) => {
      if (element.id != current_Id_forDelete) {
        newDataArr.push(element);
      }
    });
 localStorage.setItem('data', JSON.stringify(newDataArr));
 createFolders();
})

cancelDeleteFolderModal.addEventListener('click', () => {
  deleteFolderModal.style.display = 'none';
});
deleteFolderBtn.addEventListener('click', () => {
  deleteFolderModal.style.display = 'none';
});

searchBar.addEventListener('keyup', function () {
 query = searchBar.value;
 console.log(query);

 all_folders = document.querySelectorAll(".folderBox")

 let dataArr = JSON.parse(localStorage.getItem('data'));
 dataArr.forEach((element) => {
  current_folder = document.getElementById(`${element.id}`);
  if (element.folderName.includes(query)){
   // console.log(current_folder);
   current_folder.style.display = 'block';
  }
  else {
   current_folder.style.display = 'none'
  }
 })

})


cancelBox.addEventListener('click', () => {
 searchBar.value =''
})