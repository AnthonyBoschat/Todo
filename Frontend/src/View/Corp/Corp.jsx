import React from "react";
import { useSelector } from "react-redux";
import List_Task from "../../Components/Task/List/Task_List";
import Header from "../Header/Header";


export default function Corp(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)

    
    return(
        <div className={!onDisconnection ? "renderDisplay apparition" : "renderDisplay disparition"}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="taskRender_Display">
                    <Header/>
                    <List_Task/>
                </div>
            )}
            
        </div>
    )
}