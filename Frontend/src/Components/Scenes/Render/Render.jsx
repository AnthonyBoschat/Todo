import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskRender from "../Task/TaskRender"
import useFolder_Render from "../Folder/useFolderRender";
import Connection from "../Connection/Connection";
export default function Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const connected = useSelector(store => store.connection.connected)
    
    useFolder_Render()
    
    return(
        <div className="renderDisplay">
            {(!connected && !folderSelectedID) && (<Connection/>)}
            {(connected && !folderSelectedID) && (<i className="logo fa-solid fa-layer-group"></i>)}
            {(connected && folderSelectedID) && (<TaskRender />)}
        </div>
    )
}