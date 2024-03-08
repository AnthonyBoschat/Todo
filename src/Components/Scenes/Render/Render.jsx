import React from "react";
import { useSelector } from "react-redux";
import TaskRender from "../Task/TaskRender"
export default function Render(){

    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)

    return(
        <div className="renderDisplay">
            {!folderSelectedName && (<i className="fa-solid fa-layer-group"></i>)}
            {folderSelectedName && (<TaskRender />)}
        </div>
    )
}