import {useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function useItem_One(Item){

    const ItemOnEdition = useSelector(store => store.item.ItemOnEdition)
    const [ItemEditable, setItemEditable] = useState(false)
    
    const ItemRef = useRef()
    const ItemNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()

    return{
        ItemEditable,
        ItemRef,
        ItemNameRef,
        ItemOnEdition,
        leftSideRef,
        toggleCoverRef,
        setItemEditable
    }
}