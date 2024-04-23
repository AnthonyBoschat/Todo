import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Item_View from "../Item/Item_View";
import List_View from "../List/List_View";
import Indicator_Folder from "../../Components/Folder/Indicator/Folder_Indicator";
import { DragDropContext } from "react-beautiful-dnd";
import useItem_List from "../../Components/Item/List/useItem_List";
import { update_itemToShow } from "../../Components/Item/ItemSlice";
import useFetchRequest from "../../Utils/useFetchRequest";
import { update_listToShow } from "../../Components/List/ListSlice";


export default function Corp_Layout(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)
    const itemToShow = useSelector(store => store.item.itemToShow)
    const listToShow = useSelector(store => store.list.listToShow)
    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()
    
    const handleOnDragEnd = (result) => {

        const {source, destination} = result
        console.log(result)
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return

        if(destination.droppableId === "Items" && source.droppableId === "Items"){
            const items = Array.from(itemToShow)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(destination.index, 0, reorderedItem)
    
            dispatch(update_itemToShow(items))
            fetchRequest("POST", `item/sort`, {newItemsList:items})
        }
        if(destination.droppableId === "Lists" && source.droppableId === "Lists"){
            const lists = Array.from(listToShow)
            const [reorderedList] = lists.splice(result.source.index, 1)
            lists.splice(destination.index, 0, reorderedList)

            dispatch(update_listToShow(lists))
            fetchRequest("POST", `list/sort`, {newListList:lists})
        }
    }



    return(
        <div className={`renderDisplay ${onDisconnection ? "disparition" : "apparition"}`}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="ItemRender_Display">
                        <div className="header_Display">
                            <Indicator_Folder/>
                        </div>
                        <div className="Items_Lists_Box">
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Item_View/>
                                <List_View/>
                            </DragDropContext>
                        </div>
                </div>
            )}
            
        </div>
    )
}