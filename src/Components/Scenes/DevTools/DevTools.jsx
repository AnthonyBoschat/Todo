import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_RESET_FOLDERS, update_RESET_TASK } from "../../../Utils/LocalStorageSlice";
import { update_folderSelectedID} from "../Folder/FolderSlice";

export default function DevTools(){
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    const deleteFolders = () => {
        localStorage.removeItem("todoStorage")
        dispatch(update_folderSelectedID(null))
        dispatch(update_RESET_FOLDERS())
    }

    const deleteTask = () => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        if(todoStorage){
            const folderIndex = todoStorage.foldersList.findIndex(folder => folder.id === folderSelectedID)
            todoStorage.foldersList[folderIndex].taskList = []
            localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
            dispatch(update_RESET_TASK(folderIndex))
        }
    }

    return(
        <div className="devtools_Box">
            <button onClick={deleteFolders}>Delete All Folder</button>
            <button onClick={deleteTask}>Delete all Task</button>
        </div>
    )
}