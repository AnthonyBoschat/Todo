import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../FolderSlice";
import { update_taskOnEdition } from "../../Task/TaskSlice";
import useFolder_Button from "./useFolder";

export default function Button_Folder({folder}){
    
    const {
        folderSelectedID,
        handleClickFolder,
        buttonFolderRef
    } = useFolder_Button(folder)

    

    return(
        <li className="folderButton_Box">
            <button 
            className={folderSelectedID === folder?.id ? "folderSelected" : null} 
            onClick={handleClickFolder} 
            ref={buttonFolderRef}
            >
                {folder?.name}
            </button>
            
        </li>
    )
}