import {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_itemToShow } from "../../ItemSlice";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useItem_List(){

    const ItemOnCreation = useSelector(store => store.item.global.itemOnCreation) // Est-ce qu'une Item est en train d'etre créé
    const itemToShow = useSelector(store => store.item.global.itemToShow)
    const displayItemListRef = useRef()
    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()


    const dragEndItems = async(result) => {
        const {source, destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        if(destination.droppableId === "Items" && source.droppableId === "Items"){
            const items = Array.from(itemToShow)
            const [reorderedItems] = items.splice(result.source.index, 1)
            items.splice(destination.index, 0, reorderedItems)
            dispatch(update_itemToShow(items))
            fetchRequest("POST", `item/sort`, {newItemsList:items})
        }
    }

    return{
        ItemOnCreation,
        displayItemListRef,
        itemToShow,
        dragEndItems
    }
}