import React from "react";
import useFolder_Button from "./useFolder_Button";

export default function Folder_Button({folder}){
    
    const {
        folderSelectedID,
        handleClickFolder,
        buttonFolderRef
    } = useFolder_Button(folder)

    

    return(
        <li className="folderButton_Box">
            <button 
                className={folderSelectedID === folder._id && "folderSelected"} 
                onClick={handleClickFolder} 
                ref={buttonFolderRef}
            >
                {folder.name}
            </button>
            
        </li>
    )
}