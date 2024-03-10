import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskRender from "../Task/TaskRender"
import useFolder_Render from "../Folder/useFolderRender";
export default function Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    
    useFolder_Render()
    
    return(
        <div className="renderDisplay">
            {!folderSelectedID && (<i className="fa-solid fa-layer-group"></i>)}
            {folderSelectedID && (<TaskRender />)}
        </div>
    )
}