import React from "react";
import { useSelector } from "react-redux";
import Button_Folder from "../Buttons/Folder";
import Creation_Folder from "../Creation/Folder";

export default function List_Folder(){

    const foldersList = useSelector(store => store.folder.foldersList)
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)

    return(
        <div className="listFolder_Display">
            <ul className="listFolder_Box">

                {foldersList.length !== 0 && ( // La list de tout les dossiers s'il y en a
                    foldersList.map((folder, index) => (
                        <Button_Folder folder={folder} key={`folder_${index}`}/>
                    ))
                )}

                {(foldersList.length === 0 && !folderOnCreation) && ( // Si aucun dossier ( length === 0), et qu'on est pas en train d'en créer un, indication No folders
                    <div className="noFolders_Box">
                        <span>( No folders )</span>
                    </div>
                )}
                
                {folderOnCreation && ( // Si on créé un dossier, affiche la creation du dossier
                    <Creation_Folder/>
                )}

            </ul>
        </div>
    )
}