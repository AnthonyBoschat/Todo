import React from "react";
import useFolder_Button from "./useFolder_Button";
import { Draggable } from "react-beautiful-dnd";

export default function Folder_Button({folder, index}){
    
    const {
        folderSelectedID,
        handleClickFolder,
    } = useFolder_Button(folder)

    

    return(
        <Draggable draggableId={folder._id} index={index}>
            {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="folderButton_Box">
                    <div 
                        className={folderSelectedID === folder._id && "folderSelected"} 
                        onClick={handleClickFolder} 
                    >
                        {folder.name}
                    </div>
                </li>
            )}
        </Draggable>


        // <li className="folderButton_Box">
        //     <button 
        //         className={folderSelectedID === folder._id && "folderSelected"} 
        //         onClick={handleClickFolder} 
        //         ref={buttonFolderRef}
        //     >
        //         {folder.name}
        //     </button>
        // </li>
    )
}