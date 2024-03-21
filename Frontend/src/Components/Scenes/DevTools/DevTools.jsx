import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_loadFoldersList} from "../Folder/FolderSlice";
import { update_addTask, update_loadTasksList } from "../Task/TaskSlice";
import useBackend from "../../../Utils/useBackend";

export default function DevTools(){
    
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const {fetchRequest} = useBackend()
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
        fetchRequest("DELETE", {
            route:"/folders/DELETE_ALL_FOLDER",
            finalAction: () => {
                dispatch(update_folderSelectedID(null))
                fetchRequest("DELETE", {
                    route:"/tasks/DELETE_ALL_TASK",
                    finalAction: () => {
                        dispatch(update_loadFoldersList([]))
                    }
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime toutes les tasks d'un dossier
    const deleteTask = () => {
        fetchRequest("DELETE", {
            route:`/tasks/deleteAllTaskForThisFolder/${folderSelectedID}`,
            finalAction:() => {
                dispatch(update_loadTasksList([]))
                setTaskForceNumber(1)
            }
        })
    }

    // Ajoute de force une task au dossier selectionner
    const addForceTask = () => {
        const taskForce = {
            content:`Tâche forcé depuis le devTools numéro --> ${taskForceNumber} `,
            completed:false,
            folderID:folderSelectedID,
        }

        fetchRequest("POST", {
            route:"/tasks/addTask",
            body:taskForce,
            finalAction: (payload) => {
                dispatch(update_addTask(payload))
                setTaskForceNumber(current => current + 1)
            }
        })
    }

    return(
        <div className="devtools_Box">
            <button onClick={deleteFolders}>Delete All Folder</button>
            <button onClick={deleteTask}>Delete all Task</button>
            <button onClick={addForceTask}>Force une task</button>
        </div>
    )
}