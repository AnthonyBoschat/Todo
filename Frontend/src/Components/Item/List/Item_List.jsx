import React from "react";
import useItem_List from "./useItem_List";
import Creation_Item from "../Creation/Item_Creation";
import Item_One from "../One/Item_One";
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { update_reorderList } from "../../User/UserSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function Item_List(){

    const {
        ItemOnCreation,
        displayItemListRef,
        ItemToShow,
    } = useItem_List()

    const {fetchRequest} = useFetchRequest()
    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {
        const {source, destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return
        if(destination.droppableId === "trash"){
            const confirmation = window.confirm("Delete this Item ?")
            if(confirmation){
                const ItemID = userItemsList[source.index]._id
                const items = Array.from(userItemsList)
                items.splice(source.index, 1)
                dispatch(update_reorderList({listName:"userItemsList", newList:items}))
                fetchRequest("DELETE", `Item/delete/${ItemID}`)
            }
            return
        }else{
            const items = Array.from(userItemsList)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(destination.index, 0, reorderedItem)
            dispatch(update_reorderList({listName:"userItemsList", newList:items}))
            fetchRequest("POST", `Item/sort`, {newItemsList:items})
        }
    }


    return(
        <>
            {ItemToShow && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="Items">
                        {(provided) => (
                            <div ref={displayItemListRef} className="listItem_Display">
                                <div {...provided.droppableProps} ref={provided.innerRef} className="listItem_Box">

                                    {/* Si au moin une Item d'enregistrer pour ce dossier, la liste de toutes les Item*/}
                                    {(ItemToShow.length > 0) && (ItemToShow.map((Item, index) => (
                                        <Item_One index={index} key={Item._id} Item={Item}/>
                                    ) ))}

                                    {/* Nouvelle Item en cours de création */}
                                    {ItemOnCreation && ( 
                                        <Creation_Item/>
                                    )}
                                    {provided.placeholder}
                                </div>
                            </div>
                            
                        )}
                    </Droppable>   
                </DragDropContext>
            )}
        </>
        
    )
}