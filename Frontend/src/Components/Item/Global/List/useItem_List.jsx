import {useEffect, useRef} from "react";
import { useSelector } from "react-redux";

export default function useItem_List(){

    const ItemOnCreation = useSelector(store => store.item.global.itemOnCreation) // Est-ce qu'une Item est en train d'etre créé
    const itemToShow = useSelector(store => store.item.global.itemToShow)
    const displayItemListRef = useRef()


    return{
        ItemOnCreation,
        displayItemListRef,
        itemToShow,
    }
}