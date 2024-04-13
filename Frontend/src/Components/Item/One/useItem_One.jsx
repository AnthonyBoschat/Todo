import {useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function useItem_One(Item){

    const Item_Onedition = useSelector(store => store.item.Item_Onedition)
    const [ItemEditable, setItemEditable] = useState(false)
    
    const ItemRef = useRef()
    const ItemNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()

    return{
        ItemEditable,
        ItemRef,
        ItemNameRef,
        Item_Onedition,
        leftSideRef,
        toggleCoverRef,
        setItemEditable
    }
}