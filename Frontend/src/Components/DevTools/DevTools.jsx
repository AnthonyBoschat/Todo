import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../Utils/useFetchRequest";
import { update_debugConsole, update_debugPopup } from "./DevToolsSlice";
import useDevtoolsRequest from "./DevtoolsRequest";
import useItem_Action from "../Item/ItemAction";
import useUser_Action from "../User/UserAction";

export default function DevTools(){
    
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const connected = useSelector(store => store.connection.connected)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const {fetchRequest} = useFetchRequest()

    const [ItemForceNumber, setItemForceNumber] = useState(1)
    const [devtoolsButtonVisible, setDevtoolsButtonVisible] = useState(false)
    const [deleteActionVisible, setDeleteActionVisible] = useState(false)
    const [debugActionVisible, setDebugActionVisible] = useState(false)
    const [addActionVisible, setAddActionVisible] = useState(false)
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
    // Supprime toutes les Items d'un dossier
    const deleteItem = () => {
        const confirmation = window.confirm("Supprimer TOUTES les TACHES ?")
        if(confirmation){
            fetchRequest("DELETE", `devtool/DELETE_ALL_ITEMS/${folderSelectedID}`)
        }
    }

    // Ajoute de force une Item au dossier selectionner
    const addForceItem = () => {
        const ItemForce = {
            content:`Item ${ItemForceNumber} `,
            completed:false,
            folderID:folderSelectedID,
            userID:userID
        }
        fetchRequest("POST", `item/create`, ItemForce)
        setItemForceNumber(current => current + 1)
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
        <>
            <div className="devtools_Box">
                {devtoolsButtonVisible && (
                    <>
                        <div>
                            <button onClick={() => setDebugActionVisible(!debugActionVisible)} style={debugActionVisible ? {backgroundColor:"white"} : null}>Debug</button>
                            {debugActionVisible && (
                                <>
                                    <button onClick={toggleConsoleMessage} style={debugConsole ? {backgroundColor:"white"} : null}>Debug console</button>
                                    <button onClick={togglePopupMessage} style={debugPopup ? {backgroundColor:"white"} : null}>Debug Popup</button>
                                </>
                            )}
                        </div>
                        <div>
                            <button onClick={() => setAddActionVisible(!addActionVisible)} style={addActionVisible ? {backgroundColor:"white"} : null}>Add</button>
                            {addActionVisible && (
                                <>
                                    <button onClick={addForceItem}>Item</button>
                                </>
                            )}
                        </div>
                        <div>
                            <button style={deleteActionVisible ? {backgroundColor:"white"} : null} onClick={() => setDeleteActionVisible(!deleteActionVisible)}>Delete</button>
                            {deleteActionVisible && (
                                <>
                                    <button onClick={deleteFolders}>Delete All Folder</button>
                                    <button onClick={deleteItem}>Delete all Item</button>
                                    <button onClick={deleteAllUsers}>Delete All Users</button>
                                    <button onClick={deleteThisUser}>Delete This Users</button>
                                </>
                            )}
                        </div>
                        <div>
                            <button onClick={toggleConnected} style={connected ? {backgroundColor:"white"} : null}>Admin Connected</button>

                        </div>
                    </>
                )}
                <button onClick={ () => setDevtoolsButtonVisible(!devtoolsButtonVisible)} style={devtoolsButtonVisible ? {backgroundColor:"white"} : null}>Devtools</button>
            </div>
        </>
    )
}