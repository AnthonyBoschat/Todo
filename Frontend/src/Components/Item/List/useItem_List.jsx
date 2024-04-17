import {useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_reorderList } from "../../User/UserSlice";
import { update_itemToShow } from "../ItemSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useItem_List(){

    const ItemOnCreation = useSelector(store => store.item.ItemOnCreation) // Est-ce qu'une Item est en train d'etre créé

    const itemToShow = useSelector(store => store.item.itemToShow)
    const displayItemListRef = useRef()
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    const handleOnDragEnd = (result) => {
        const {source, destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return

        const items = Array.from(itemToShow)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(destination.index, 0, reorderedItem)

        dispatch(update_itemToShow(items))
        fetchRequest("POST", `item/sort`, {newItemsList:items})
    }


    return{
        ItemOnCreation,
        displayItemListRef,
        itemToShow,
        handleOnDragEnd,
    }
}