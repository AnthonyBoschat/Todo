import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_RESET_FOLDERS, update_RESET_TASK } from "../../../Utils/LocalStorageSlice";
import { update_folderSelectedID} from "../Folder/FolderSlice";

export default function DevTools(){
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    const deleteFolders = () => {

        fetch("http://localhost:4000/folders/DELETE_ALL_FOLDER", {
            method:"DELETE",
        })
        .then(response => response.json())
        .then(finalResponse => {
            console.log(finalResponse.message)
            dispatch(update_folderSelectedID(null))
            dispatch(update_RESET_FOLDERS())
        })
        .catch(error => console.error("Erreur lors de la suppression des dossiers : ", error))
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

    const addForceTask = () => {
        console.log("Tentative de mise en relation frontend et backend...")

        // Création d'une tâche de test
        const task = {
            content:"Tâche forcé depuis le devTools",
            completed:false,
            folderID:folderSelectedID,
        }

        // Envoyer la tâche à l'API
        fetch("http://localhost:4000/tasks/addTask", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => console.log("Tâche rengistrée :", data))
        .catch(error => console.error("Erreur lors de l'enregistrement de la tâche : ", error))
    }

    return(
        <div className="devtools_Box">
            <button onClick={deleteFolders}>Delete All Folder</button>
            <button onClick={deleteTask}>Delete all Task</button>
            <button onClick={addForceTask}>Force une task</button>
        </div>
    )
}