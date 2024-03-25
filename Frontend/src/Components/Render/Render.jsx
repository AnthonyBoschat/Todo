import React from "react";
import { useSelector } from "react-redux";
import TaskRender from "../Task/TaskRender"


export default function Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)

    
    return(
        <div className={!onDisconnection ? "renderDisplay apparition" : "renderDisplay disparition"}>
            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}
            {folderSelectedID && (<TaskRender />)}
        </div>
    )
}