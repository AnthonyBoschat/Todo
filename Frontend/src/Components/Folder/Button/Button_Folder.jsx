import React from "react";
import useFolder_Button from "./useButton_Folder";

export default function Button_Folder({folder}){
    
    const {
        folderSelectedID,
        handleClickFolder,
        buttonFolderRef
    } = useFolder_Button(folder)

    

    return(
        <li className="folderButton_Box">
            <button 
                className={folderSelectedID === folder._id ? "folderSelected" : null} 
                onClick={handleClickFolder} 
                ref={buttonFolderRef}
            >
                {folder.name}
            </button>
            
        </li>
    )
}