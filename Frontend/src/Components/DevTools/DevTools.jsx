import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../Utils/useFetchRequest";
import { update_connected } from "../Connection/ConnectionSlice";
import { update_debugConsole, update_debugPopup } from "./DevToolsSlice";
import usePopup from "../Popup/usePopup";
import useDevtoolsRequest from "./DevtoolsRequest";
import useTask_Request from "../Task/TaskRequest";
import useUser_Request from "../User/UserRequest";

export default function DevTools(){
    
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const connected = useSelector(store => store.connection.connected)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const {fetchRequest} = useFetchRequest()
    
    const {
        devtoolsRequest_DELETE_ALL_TASKS,
        devtoolsRequest_DELETE_ALL_FOLDERS,
        devtoolsRequest_DELETE_ALL_USERS,
        devtoolsRequest_DELETE_THIS_USER
    } = useDevtoolsRequest()

    const {
        userRequest_Connect,
        userRequest_Disconnect,
    } = useUser_Request()

    const {
        taskRequest_Create
    } = useTask_Request()

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
            fetchRequest("DELETE", `devtool/DELETE_ALL_FOLDERS/${userID}`)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime toutes les tasks d'un dossier
    const deleteTask = () => {
        const confirmation = window.confirm("Supprimer TOUTES les TACHES ?")
        if(confirmation){
            fetchRequest("DELETE", `devtool/DELETE_ALL_TASKS/${folderSelectedID}`)
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
        fetchRequest("POST", `task/create`, taskForce)
        setTaskForceNumber(current => current + 1)
    }

    const deleteAllUsers = () => {
        const confirmation = window.confirm("Supprimer TOUT les UTILISATEURS ?")
        if(confirmation){
            fetchRequest("DELETE", `devtool/DELETE_ALL_USERS`)
        }
    }

    const deleteThisUser = () => {
        const confirmation = window.confirm("Supprimer CET UTILISATEUR ?")
        if(confirmation){
            fetchRequest("DELETE", `devtool/DELETE_THIS_USER/${userID}`)
        }
        
    }

    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Active ou non les message dans la console ou dans les popups
    const toggleConsoleMessage = () => {dispatch(update_debugConsole(!debugConsole))}
    const togglePopupMessage = () => {dispatch(update_debugPopup(!debugPopup))}
    const toggleConnected = () => {
        if(!connected){
            const userAdmin = {
                userEmail:"anthonyboschat.dev@hotmail.com",
                userPassword:"sudo"
            }
            fetchRequest("POST", `user/connect`, userAdmin)
        }else{
            fetchRequest("GET", `user/disconnect`)
        }
    }

    return(
        <div className="devtools_Box">
            <button onClick={deleteFolders}>Delete All Folder</button>
            <button onClick={deleteTask}>Delete all Task</button>
            <button onClick={deleteAllUsers}>Delete All Users</button>
            <button onClick={deleteThisUser}>Delete This Users</button>
            <button onClick={addForceTask}>Force une task</button>
            <button onClick={toggleConsoleMessage} style={debugConsole ? {backgroundColor:"white"} : null}>Debug console</button>
            <button onClick={togglePopupMessage} style={debugPopup ? {backgroundColor:"white"} : null}>Debug Popup</button>
            <button onClick={toggleConnected} style={connected ? {backgroundColor:"white"} : null}>Admin Connected</button>
        </div>
    )
}