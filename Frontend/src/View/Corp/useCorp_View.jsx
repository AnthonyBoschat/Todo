import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../Utils/useFetchRequest";
import { update_itemToShow } from "../../Components/Item/ItemSlice";
import { update_listToShow } from "../../Components/List/ListSlice";

export default function (){

    const itemToShow = useSelector(store => store.item.itemToShow)
    const listToShow = useSelector(store => store.list.listToShow)
    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {

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

        if(destination.droppableId === "Lists" && source.droppableId === "Lists"){
            const lists = Array.from(listToShow)
            const [reorderedList] = lists.splice(result.source.index, 1)
            lists.splice(destination.index, 0, reorderedList)

            dispatch(update_listToShow(lists))
            fetchRequest("POST", `list/sort`, {newListList:lists})
        }

        if(destination.droppableId === "Lists" && source.droppableId === "Items"){
            console.log("dépot")
        }
    }

    // const handleDragUpdate = (update) => {
    //     const {destination} = update
    //     if(destination && destination.droppableId === "items" && update.type === "list"){
    //         console.log("go")
    //         return
    //     }
    //     console.log("gooooooo")
    // }

    return{
        handleOnDragEnd,
        // handleDragUpdate
    }
}