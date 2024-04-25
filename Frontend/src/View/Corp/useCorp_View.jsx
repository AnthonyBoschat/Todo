import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../Utils/useFetchRequest";
import { update_itemToShow } from "../../Components/Item/ItemSlice";
import { update_collectionToShow } from "../../Components/Collection/CollectionSlice";

export default function (){

    const itemToShow = useSelector(store => store.item.global.itemToShow)
    const collectionToShow = useSelector(store => store.collection.collectionToShow)
    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()

    const handleOnDragEnd = async(result) => {
        const {source, destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return
        if(destination.droppableId === "Items" && source.droppableId === "Items"){
            const items = Array.from(itemToShow)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(destination.index, 0, reorderedItem)
    
            dispatch(update_itemToShow(items))
            fetchRequest("POST", `item/sort`, {newItemsList:items})
        }
        if(destination.droppableId === "Collections" && source.droppableId === "Collections"){
            console.log("here")
            const collections = Array.from(collectionToShow)
            const [reorderedList] = collections.splice(result.source.index, 1)
            collections.splice(destination.index, 0, reorderedList)

            dispatch(update_collectionToShow(collections))
            fetchRequest("POST", `collection/sort`, {newCollectionsList:collections})
        }
        if(destination.droppableId !== "Collections" && destination.droppableId !== "Items"){
            if(source.droppableId === "Items"){
                // Code for add Item into the list
                const payload = {
                    itemID:result.draggableId,
                    listID:destination.droppableId,
                    itemPosition:destination.index
                }
                await fetchRequest("POST", "collection/addItem", payload)
            }
        }
    }

    return{
        handleOnDragEnd,
    }
}