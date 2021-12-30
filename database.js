// let database = {
//     "data":[]
// }
function setData(value) {
    localStorage.setItem('data', JSON.stringify(value))
}

function getData() {
    if(!JSON.parse(localStorage.getItem('data'))){
        setData([])
        return getData()
    }
    return JSON.parse(localStorage.getItem('data'))
}

function getCurrentFoldersChildren() {
    let dataArr = getData()
    if(!dataArr){
        setData([])
        return getData()
    }
    else if (current_breadcrumb_id == 'root') {
        return dataArr
    }
    else {
        return dfsExt(current_breadcrumb_id, dataArr)
    }
}


function storeNotepadFile() {
    // currentFoldersChildren = getCurrentFoldersChildren()
    // console.log(currentFoldersChildren);
    counter = 0; //Placed a counter to handle repeated folder creation
    let dataArr = getData()



    //Handle creation of notepad file in the root directory
    if(current_breadcrumb_id.trim() == 'root' && dataArr.length==0){ //Case: Root directory is empty
        if (counter==0){
            counter++;
            //work inside root directory
            let inputBox = document.querySelector('.header_folderName');
            let fontSize = document.querySelector('.textSizeValue').innerHTML
            let fontFamily = document.querySelector('#fontOption').value;
            let content = document.querySelector('#notepadTextArea').value
            console.log(content);

            var fileName = inputBox.value;
            let newId = uid();
            let obj = {
                id: newId,
                fileName: fileName,
                fontSize: fontSize,
                fontFamily: fontFamily,
                content: content,
                ext: ".txt"
            };

            dataArr.push(obj);

            setData(dataArr)
            displayFolders()
        }

    }
    
    dataArr.forEach((e) => { //Case: Root directory is not empty
        if (current_breadcrumb_id.trim() == 'root' && counter == 0) {
            counter++;
            //work inside root directory
            let inputBox = document.querySelector('.header_folderName');
            let fontSize = document.querySelector('.textSizeValue').innerHTML
            let fontFamily = document.querySelector('#fontOption').value;
            let content = document.querySelector('#notepadTextArea').value
            console.log(content);

            var fileName = inputBox.value;
            let newId = uid();
            let obj = {
                id: newId,
                fileName: fileName,
                fontSize: fontSize,
                fontFamily: fontFamily,
                content: content,
                ext: ".txt"
            };

            dataArr.push(obj);

            setData(dataArr)
            displayFolders()

        }
        //Handle creation of notepad inside a sub-folder
        dfsNotepadExt(e, current_breadcrumb_id, dataArr);
    });


}




//To store the new folder in the appropriate sub-folder using DFS
function dfsStoreExt(e, current_breadcrumb_id, dataArr) {
    if (
        e.id == current_breadcrumb_id &&
        (e.children.length == 0 || !e.children)
    ) {
        let inputBox = document.querySelector('#createFolderInput');
        // console.log('First folder in ', e.folderName);
        let folderName = inputBox.value;
        let newId = uid();
        let obj = {
            id: newId,
            folderName: folderName,
            children: [],
        };
        console.log(e);
        console.log(e.children);
        e.children = [obj];
        console.log(e.children);

        // localStorage.setItem('data', JSON.stringify(dataArr));
        // database.data = dataArr
        setData(dataArr)
    } else if (e.id == current_breadcrumb_id) {
        let inputBox = document.querySelector('#createFolderInput');
        console.log('New folder in ', e.folderName);
        let folderName = inputBox.value;
        let newId = uid();
        let obj = {
            id: newId,
            folderName: folderName,
            children: [],
        };
        // console.log(e);
        // console.log(e.children);
        e.children.push(obj);
        // console.log(e.children);

        // localStorage.setItem('data', JSON.stringify(dataArr));
        // database.data = dataArr
        setData(dataArr)
    } else {
        dfsStoreInt(e.children, current_breadcrumb_id, dataArr);
    }
}

function dfsStoreInt(childFolder, current_breadcrumb_id, dataArr) {
    if (childFolder) {
        childFolder.forEach((e) => {
            dfsStoreExt(e, current_breadcrumb_id, dataArr);
        });
    }
}


//To store the new Notepad file in the appropriate sub-folder using DFS

function dfsNotepadExt(e, current_breadcrumb_id, dataArr) {
    console.log(current_breadcrumb_id, dataArr);
    if (
        e.id == current_breadcrumb_id &&
        (e.children.length == 0 || !e.children)
    ) { //sub folder is empty
        let inputBox = document.querySelector('.header_folderName');
        let fontSize = document.querySelector('.textSizeValue').innerHTML
        let fontFamily = document.querySelector('#fontOption').value;
        let content = document.querySelector('#notepadTextArea').value

        let fileName = inputBox.value;
        let newId = uid();
        let obj = {
            id: newId,
            fileName: fileName,
            fontSize: fontSize,
            fontFamily: fontFamily,
            content: content,
            ext: ".txt"
        };

        e.children = [obj];


        // localStorage.setItem('data', JSON.stringify(dataArr));
        // database.data = dataArr
        console.log("Set inside folder",e.folderName);
        setData(dataArr)
        displayFolders()
    } else if (e.id == current_breadcrumb_id) { //sub folder is not empty
        let inputBox = document.querySelector('.header_folderName');
        let fontSize = document.querySelector('.textSizeValue').innerHTML
        let fontFamily = document.querySelector('#fontOption').value;
        let content = document.querySelector('#notepadTextArea').value

        let fileName = inputBox.value;
        let newId = uid();
        let obj = {
            id: newId,
            fileName: fileName,
            fontSize: fontSize,
            fontFamily: fontFamily,
            content: content,
            ext: ".txt"
        };
        
        e.children.push(obj);
        
        setData(dataArr)
        displayFolders()
    } else {
        dfsNotepadInt(e.children, current_breadcrumb_id, dataArr);
    }
}

function dfsNotepadInt(childFolder, current_breadcrumb_id, dataArr) {
    if (childFolder) {
        childFolder.forEach((e) => {
            dfsNotepadExt(e, current_breadcrumb_id, dataArr);
        });
    }
}
