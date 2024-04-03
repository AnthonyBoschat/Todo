import React from "react";
import { useDispatch } from "react-redux";
import { update_folderOnCreation } from "../FolderSlice";

export default function Add_Folder(){

    const dispatch = useDispatch()

    return(
        <div className="addButtonFolder_Display">
            <div className="addButtonFolder_Box">
                <button onClick={() => dispatch(update_folderOnCreation(true))} className="addButtonFolder">
                    <i className="fa-solid fa-folder-plus"></i>
                    <span>New folder</span>
                </button>
            </div>
        </div>
    )
}