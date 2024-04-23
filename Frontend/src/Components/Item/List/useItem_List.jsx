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


    return{
        ItemOnCreation,
        displayItemListRef,
        itemToShow,
    }
}