import React, { useEffect } from "react";
import Add_Folder from "../Folder/Add/Folder";
import List_Folder from "../Folder/List/Folder";
import User from "../User/User";
import { useDispatch } from "react-redux";
import useBackend from "../../Utils/useBackend";
import { update_allFoldersLoad, update_loadFoldersList } from "../Folder/FolderSlice";
import { useSelector } from "react-redux";

export default function Pannel(){

    const allFoldersLoad = useSelector(store => store.folder.allFoldersLoad)
    const connected = useSelector(store => store.connection.connected)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const {fetchRequest} = useBackend()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!allFoldersLoad && userID){
            fetchRequest("GET", {
                route:`/folders/getAllFolders/${userID}`,
                finalAction:(payload) => {
                    dispatch(update_loadFoldersList(payload))
                    dispatch(update_allFoldersLoad(true))
                }
            })  
        }
    }, [userID])

    return(
        <div className="pannel_display">
            <div style={!connected ? {display:"none"} : null} className={!onDisconnection ? "pannel_Box apparition" : "pannel_Box disparition" }>
                <Add_Folder/>
                <List_Folder/>
                <User/>
            </div>
        </div>
    )
}