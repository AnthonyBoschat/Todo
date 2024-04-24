import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Item_View from "../Item/Item_View";
import List_View from "../List/List_View";
import Indicator_Folder from "../../Components/Folder/Indicator/Folder_Indicator";
import { DragDropContext } from "react-beautiful-dnd";
import useCorp_View from "./useCorp_View";


export default function Corp_Layout(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)
    const {handleOnDragEnd} = useCorp_View()



    return(
        <div className={`renderDisplay ${onDisconnection ? "disparition" : "apparition"}`}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="ItemRender_Display">
                        <div className="header_Display">
                            <Indicator_Folder/>
                        </div>
                        <div className="Items_Lists_Box">
                            <DragDropContext  onDragEnd={handleOnDragEnd}>
                                <Item_View/>
                                <List_View/>
                            </DragDropContext>
                        </div>
                </div>
            )}
            
        </div>
    )
}