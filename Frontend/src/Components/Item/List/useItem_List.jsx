import {useRef} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_reorderList } from "../../User/UserSlice";

export default function useItem_List(){

    const ItemOnCreation = useSelector(store => store.item.ItemOnCreation) // Est-ce qu'une Item est en train d'etre créé
    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const ItemToShow = userItemsList.filter(Item => Item?.folderID === folderSelectedID)
    const displayItemListRef = useRef()
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {
        if(!result.destination) return
        const items = Array.from(userItemsList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        dispatch(update_reorderList({listName:"userItemsList", newList:items}))
    }


    return{
        ItemOnCreation,
        displayItemListRef,
        ItemToShow,
        handleOnDragEnd
    }
}