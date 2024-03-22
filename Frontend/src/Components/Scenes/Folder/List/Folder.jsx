import React, {useRef} from "react";
import { useSelector } from "react-redux";
import Button_Folder from "../Buttons/Folder";
import Creation_Folder from "../Creation/Folder";

export default function List_Folder(){

    const foldersList = useSelector(store => store.folder.foldersList)
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    return(
        <div className="listFolder_Display">
            <ul className="listFolder_Box">
                {foldersList.length !== 0 && (
                    foldersList.map((folder, index) => (
                        <Button_Folder folder={folder} key={index}/>
                    ))
                )}

                {(foldersList.length === 0 && !folderOnCreation) && (
                    <div className="noFolders_Box">
                        <span>( No folders )</span>
                    </div>
                )}
                
                {folderOnCreation && (
                    <Creation_Folder/>
                )}
            </ul>
        </div>
    )
}