import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_RESET_FOLDERS, update_RESET_TASK, update_deleteFolder } from "../../../Utils/LocalStorageSlice";
import { update_folderSelectedID} from "../Folder/FolderSlice";
import { update_addTask, update_loadTasksList } from "../Task/TaskSlice";

export default function DevTools(){
    
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const [taskForceNumber, setTaskForceNumber] = useState(1)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FONCTION
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime tout les dossiers
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime toutes les tasks d'un dossier
    const deleteTask = () => {
        fetch(`http://localhost:4000/tasks/deleteAllTaskForThisFolder/${folderSelectedID}`, {method:"DELETE"})
            .then(response => {
                if(!response.ok){
                    throw new Error(`Echec de la suppression des task associé au dossier ${folderSelectedID}`)
                }
                return response.json()
            })
            .then(result => {
                console.log(result.message)
                dispatch(update_loadTasksList([]))
                setTaskForceNumber(1)
            })
            .catch(error => console.error(error.message))
    }

    // Ajoute de force une task au dossier selectionner
    const addForceTask = () => {
        console.log("Tentative de mise en relation frontend et backend...")

        // Création d'une tâche de test
        const taskForce = {
            content:`Tâche forcé depuis le devTools numéro --> ${taskForceNumber} `,
            completed:false,
            folderID:folderSelectedID,
        }

        // Envoyer la tâche à l'API
        fetch("http://localhost:4000/tasks/addTask", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskForce)
        })
        .then(response => response.json())
        .then(task => {
            console.log("Tâche rengistrée :", task)
            dispatch(update_addTask(task))
            setTaskForceNumber(current => current + 1)
        })
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