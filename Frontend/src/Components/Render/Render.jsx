import React from "react";
import { useSelector } from "react-redux";
import Header_Task from "../Task/Header/Task";
import List_Task from "../Task/List/Task";


export default function Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)

    
    return(
        <div className={!onDisconnection ? "renderDisplay apparition" : "renderDisplay disparition"}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="taskRender_Display">
                    <Header_Task/>
                    <List_Task/>
                </div>
            )}
            
        </div>
    )
}