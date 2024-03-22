import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskRender from "../Task/TaskRender"
import useFolder_Render from "../Folder/useFolderRender";
import Connection from "../Connection/Connection";
import Popup from "../Popup/Popup";
export default function Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const connected = useSelector(store => store.connection.connected)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)
    
    useFolder_Render()
    
    return(
        <div className="renderDisplay">
            {(connected && !folderSelectedID) && (<i className={!onDisconnection ? "logo apparition fa-solid fa-layer-group" : "logo disparition fa-solid fa-layer-group"}></i>)}
            {(connected && folderSelectedID) && (<TaskRender />)}
        </div>
    )
}