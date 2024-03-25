import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_allFoldersLoad, update_folderSelectedID, update_loadFoldersList} from "../Folder/FolderSlice";
import { update_addTask, update_loadTasksList } from "../Task/TaskSlice";
import useBackend from "../../Utils/useBackend";
import { update_closeConnection, update_connected } from "../Connection/ConnectionSlice";
import { update_debugConsole, update_debugPopup } from "./DevToolsSlice";
import usePopup from "../Popup/usePopup";

export default function DevTools(){
    
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const connected = useSelector(store => store.connection.connected)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const {fetchRequest} = useBackend()
    const {popup} = usePopup()
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
        const confirmation = window.confirm("Supprimer TOUT les DOSSIERS de cette utilisateur ?")
        if(confirmation){
            fetchRequest("DELETE", {
                route:`/folders/DELETE_ALL_FOLDER/${userID}`,
                finalAction: () => {
                    dispatch(update_folderSelectedID(null))
                    dispatch(update_loadFoldersList([]))
                }
            })
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime toutes les tasks d'un dossier
    const deleteTask = () => {
        const confirmation = window.confirm("Supprimer TOUTES les TACHES ?")
        if(confirmation){
            fetchRequest("DELETE", {
                route:`/tasks/deleteAllTaskForThisFolder/${folderSelectedID}`,
                finalAction:() => {
                    dispatch(update_loadTasksList([]))
                    setTaskForceNumber(1)
                }
            })
        }
    }

    // Ajoute de force une task au dossier selectionner
    const addForceTask = () => {
        const taskForce = {
            content:`Tâche forcé depuis le devTools numéro --> ${taskForceNumber} `,
            completed:false,
            folderID:folderSelectedID,
            userID:userID
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

    const deleteAllUsers = () => {
        const confirmation = window.confirm("Supprimer TOUT les UTILISATEURS ?")
        if(confirmation){
            fetchRequest("DELETE", {
                route:"/users/DELETE_ALL_USERS",
                finalAction:() => {
                    dispatch(update_closeConnection())
                    dispatch(update_folderSelectedID(null))
                    dispatch(update_loadFoldersList([]))
                    dispatch(update_loadTasksList([]))
                    dispatch(update_allFoldersLoad(false))
                }
            })
        }
    }

    const deleteThisUser = () => {
        const confirmation = window.confirm("Supprimer CET UTILISATEUR ?")
        if(confirmation){
            fetchRequest("DELETE", {
                route:`/users/DELETE_THIS_USER/${userID}`,
                finalAction:() => {
                    dispatch(update_closeConnection())
                    dispatch(update_folderSelectedID(null))
                    dispatch(update_loadFoldersList([]))
                    dispatch(update_loadTasksList([]))
                    dispatch(update_allFoldersLoad(false))
                },
                errorAction:()=>{
                    popup({
                        message:"Aucun utilisateur de connecter. Impossible de supprimer l'utilisateur"
                    })
                }
            })
        }
        
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Active ou non les message dans la console ou dans les popups
    const toggleConsoleMessage = () => {dispatch(update_debugConsole(!debugConsole))}
    const togglePopupMessage = () => {dispatch(update_debugPopup(!debugPopup))}
    const toggleConnected = () => {dispatch(update_connected(!connected))}

    return(
        <div className="devtools_Box">
            <button onClick={deleteFolders}>Delete All Folder</button>
            <button onClick={deleteTask}>Delete all Task</button>
            <button onClick={deleteAllUsers}>Delete All Users</button>
            <button onClick={deleteThisUser}>Delete This Users</button>
            <button onClick={addForceTask}>Force une task</button>
            <button onClick={toggleConsoleMessage} style={debugConsole ? {backgroundColor:"white"} : null}>Debug console</button>
            <button onClick={togglePopupMessage} style={debugPopup ? {backgroundColor:"white"} : null}>Debug Popup</button>
            <button onClick={toggleConnected} style={connected ? {backgroundColor:"white"} : null}>Connected</button>
        </div>
    )
}