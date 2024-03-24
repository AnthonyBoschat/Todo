import React, { useEffect } from "react";
import Add_Folder from "./Add/Folder";
import List_Folder from "./List/Folder";
import User from "../User/User";
import { useSelector } from "react-redux";
import useBackend from "../../../Utils/useBackend";
import { useDispatch } from "react-redux";
import { update_allFoldersLoad, update_loadFoldersList } from "./FolderSlice";

export default function FolderRender(){

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
        <div className="folderRender_display">
            <div style={!connected ? {display:"none"} : null} className={!onDisconnection ? "folderRender_Box apparition" : "folderRender_Box disparition" }>
                <Add_Folder/>
                <List_Folder/>
                <User/>
            </div>
        </div>
    )
}