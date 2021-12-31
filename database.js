// let database = {
//     "data":[]
// }
function setData(value) {
    localStorage.setItem('data', JSON.stringify(value))
}

function getData() {
    if (!JSON.parse(localStorage.getItem('data'))) {
        setData([])
        return getData()
    }
    return JSON.parse(localStorage.getItem('data'))
}

function getCurrentFoldersChildren() {
    let dataArr = getData()
    if (!dataArr) {
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


function storeNotepadFile(id, name) {
    console.log(id,name);
    let dataArr = getData()
    resultFileData=undefined;
    let fileData = getFileDataExt(id, name, dataArr)
    // console.log(resultFileData)

    // console.log(fileData);
    if (id === undefined && fileData === undefined) { //Creating file for the first time. 2nd condition is necessary.
        console.log("Went in if");
        counter = 0; //Placed a counter to handle repeated file creation
        let dataArr = getData()



        //Handle creation of notepad file in the root directory
        if (current_breadcrumb_id.trim() == 'root' && dataArr.length == 0) { //Case: Root directory is empty
            if (counter == 0) {
                counter++;
                //work inside root directory
                let inputBox = document.querySelector('.header_folderName');
                let fontSize = document.querySelector('.textSizeValue').innerHTML
                let fontFamily = document.querySelector('#fontOption').value;
                let content = document.querySelector('#notepadTextArea').value
                let bold = document.querySelector('#notepadTextArea').style.fontWeight;
                let italic = document.querySelector('#notepadTextArea').style.fontStyle;

                var fileName = inputBox.value;
                let newId = uid();
                let obj = {
                    id: newId,
                    fileName: fileName,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    bold: bold,
                    italic: italic,
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
                let bold = document.querySelector('#notepadTextArea').style.fontWeight;
                let italic = document.querySelector('#notepadTextArea').style.fontStyle;


                // console.log(content);

                var fileName = inputBox.value;
                let newId = uid();
                let obj = {
                    id: newId,
                    fileName: fileName,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    bold: bold,
                    italic: italic,
                    content: content,
                    ext: ".txt"
                };

                dataArr.push(obj);

                setData(dataArr)
                displayFolders()

            }
            //Handle creation of notepad inside a sub-folder
            else {
                dfsNotepadExt(e, current_breadcrumb_id, dataArr);
            }
        });

    }
    else { //Case: File was created previously, update the data
        let dataArr = getData()
        counter = 0; //Placed a counter to handle repeated file creation

        if (current_breadcrumb_id == 'root') { //Case: Notepad file is in root directory 

            //work inside root directory
            dataArr.forEach((e) => {
                if (e.id == id && counter == 0) {
                    counter++;
                    console.log(e.id, e.fileName, id);
                    e.fileName = document.querySelector('.header_folderName').value.split(".")[0]
                    // console.log(e.fileName);
                    e.fontSize = document.querySelector('.textSizeValue').innerHTML
                    // console.log(e.fontSize);
                    e.fontFamily = document.querySelector('#fontOption').value;
                    // console.log(e.fontFamily);
                    e.content = document.querySelector('#notepadTextArea').value
                    // console.log(document.querySelector('#notepadTextArea').value);
                    e.bold = document.querySelector('#notepadTextArea').style.fontWeight;
                    // console.log(e.bold);
                    e.italic = document.querySelector('#notepadTextArea').style.fontStyle;
                    // console.log(e.italic);


                    console.log(dataArr);
                    setData(dataArr)
                }
            })
        }
        else { //Case: Notepad is in a sub-folder
            let newdataArr = setFileDataExt(fileData, id, name, dataArr)

            setData(newdataArr)
        }

    }
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
    // console.log(current_breadcrumb_id, dataArr);
    if (
        e.id == current_breadcrumb_id &&
        (e.children.length == 0 || !e.children)
    ) { //sub folder is empty
        let inputBox = document.querySelector('.header_folderName');
        let fontSize = document.querySelector('.textSizeValue').innerHTML
        let fontFamily = document.querySelector('#fontOption').value;
        let content = document.querySelector('#notepadTextArea').value
        let bold = document.querySelector('#notepadTextArea').style.fontWeight;
        let italic = document.querySelector('#notepadTextArea').style.fontStyle;

        let fileName = inputBox.value;
        let newId = uid();
        let obj = {
            id: newId,
            fileName: fileName,
            fontSize: fontSize,
            fontFamily: fontFamily,
            bold: bold,
            italic: italic,
            content: content,
            ext: ".txt"
        };

        e.children = [obj];


        // localStorage.setItem('data', JSON.stringify(dataArr));
        // database.data = dataArr
        console.log("Set inside folder", e.folderName);
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

//open the file
function openFile(id, name) {
    let dataArr = getData()
    // console.log(dataArr);
    resultFileData=undefined
    let fileData = getFileDataExt(id, name, dataArr)
    console.log(resultFileData)

    // console.log(fileData);
    if (fileData.ext == ".txt") { //handle display of .txt files
        // console.log("Going to open notepad");
        //open Notepad modal with filedata
        handleOpeningNotepad(fileData)


        //keyup event to constantly write data
    }
}

//GET a file's data using DFS
let resultFileData;
function getFileDataExt(id, name, dataArr) {

    dataArr.forEach((e) => {
        // console.log(e.id, id);
        if (e.id == id) {
            //If relevant folder has been found

            if (!resultFileData) {
                //condition put to not let undefined result override the actual result
                resultFileData = e;
            } else if (e) {
                //update the children array and return it
                resultFileData = e;
            }
        } else if (e.folderName) {
            //Search in the child folder
            getFileDataInt(id, name, e.children);
        } else { //some other file encountered

        }
    });
    return resultFileData;
}

function getFileDataInt(id, name, childFolder) {
    // console.log(childFolder);
    if (childFolder) {
        childFolder.forEach((e) => {
            // console.log(e.id);
            getFileDataExt(id, name, childFolder);
        });
    }
}


//SET a file's data using DFS
let currentFileData;
function setFileDataExt(obj, id, name, dataArr) {

    dataArr.forEach((e) => {
        // console.log(e.id, id);
        if (e.id == id) {
            //If relevant file has been found
            console.log(e.id, id);
            if (!currentFileData) {
                //condition put to not let undefined result override the actual result
                currentFileData = e;
            } else if (e) {
                //update the data and return it
                e.fileName = document.querySelector('.header_folderName').value.split(".")[0]
                e.fontSize = document.querySelector('.textSizeValue').innerHTML
                e.fontFamily = document.querySelector('#fontOption').value;
                e.content = document.querySelector('#notepadTextArea').value
                e.bold = document.querySelector('#notepadTextArea').style.fontWeight;
                e.italic = document.querySelector('#notepadTextArea').style.fontStyle;

                console.log(e);
                // setData(dataArr)
            }

        } else if (e.folderName) {
            //Search in the child folder
            // console.log("Searching in ", e.folderName);
            setFileDataInt(obj, id, name, e.children);
        } else { //some other file encountered

        }
    });
    return dataArr;
}

function setFileDataInt(obj, id, name, childFolder) {
    // console.log(childFolder);
    if (childFolder) {
        childFolder.forEach((e) => {
            // console.log(e.id);
            setFileDataExt(obj, id, name, childFolder);
        });
    }
}