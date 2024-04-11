import React, { useCallback, useEffect }  from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button_Folder from "../Button/Folder_Button";
import Creation_Folder from "../Creation/Folder_Creation";
import { update_reorderList } from "../../User/UserSlice";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useFolder_Request from "../FolderRequest";

export default function Folder_List(){

    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const dispatch = useDispatch()
    const {folderRequest_Sort} = useFolder_Request()

    const handleOnDragEnd = (result) => {
        if(!result.destination) return
        const items = Array.from(userFoldersList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        console.log(items)
        dispatch(update_reorderList({listName:"userFoldersList", newList:items}))
        folderRequest_Sort({newFoldersList:items})
    }


    return(
        <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="folders">
                    {(provided) => (
                        <div className="listFolder_Display">
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="listFolder_Box">
                
                                    {userFoldersList.length !== 0 && ( // La list de tout les dossiers s'il y en a
                                        userFoldersList.map((folder, index) => (
                                            <Button_Folder index={index} folder={folder} key={folder._id} />
                                        ))
                                    )}
                
                                    {(userFoldersList.length === 0 && !folderOnCreation) && ( // Si aucun dossier ( length === 0), et qu'on est pas en train d'en créer un, indication No folders
                                        <div className="noFolders_Box">
                                            <span>( No folders )</span>
                                        </div>
                                    )}
                                    
                                    {folderOnCreation && ( // Si on créé un dossier, affiche la creation du dossier
                                        <Creation_Folder/>
                                    )}
                                    {provided.placeholder}
                            </ul>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        
    )
}