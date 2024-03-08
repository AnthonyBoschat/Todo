import React from "react";
import { useSelector } from "react-redux";

export default function Add_Task(){

    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)

    return(
        <div className="addTask_Display">
            <div className="addTask_Box">
                <i className="fa-solid fa-plus"></i>
                <span>Ajouter une tâche</span>
            </div>
            <div className="folderIndicator_Box">
                {`/ ${folderSelectedName}`}
            </div>
        </div>
    )
}