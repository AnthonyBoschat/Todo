import React from "react";
import useAddFolder from "./useFolder";

export default function AddButton_Folder(){

    const {addNewFolder} = useAddFolder()

    return(
        <div className="addButtonFolder_Display">
            <div className="addButtonFolder_Box">
                <button onClick={addNewFolder} className="addButtonFolder">
                    <i className="fa-solid fa-folder-plus"></i>
                    <span>Créer un nouveau dossier</span>
                </button>
            </div>
        </div>
    )
}