import {useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_ItemOnEdition } from "../ItemSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useItem_One(Item){

    const ItemOnEdition = useSelector(store => store.item.ItemOnEdition)
    const [ItemEditable, setItemEditable] = useState(false)
    const {fetchRequest} = useFetchRequest()
    
    const ItemRef = useRef()
    const ItemNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()

    // Pour toggle une Item en finish ou unFinish
    const toggle_completedItem = (ItemID, newValueItemCompleted) => { 
        if(!newValueItemCompleted){
            toggleCoverRef.current.classList.add("coverReturn")
            setTimeout(async() => {
                await fetchRequest("PUT", `Item/toggleCompleted/${ItemID}`, {completed:newValueItemCompleted})
                toggleCoverRef.current.classList.remove("coverReturn")
            }, 100);
        }
        if(newValueItemCompleted){
            fetchRequest("PUT", `Item/toggleCompleted/${ItemID}`, {completed:newValueItemCompleted})
        }
    }


    const toggle_onWorkingItem = (ItemID, newValueItemOnWorking) => {
        if(!newValueItemOnWorking){
            toggleCoverRef.current.classList.add("coverReturn")
            setTimeout(async() => {
                await fetchRequest("PUT", `Item/toggleOnWorking/${ItemID}`, {onWorking:newValueItemOnWorking})
                toggleCoverRef.current.classList.remove("coverReturn")
            }, 250);
        }
        if(newValueItemOnWorking){
            fetchRequest("PUT", `Item/toggleOnWorking/${ItemID}`, {onWorking:newValueItemOnWorking})
        }
        
    }


    

    

    

    

    return{
        ItemEditable,
        ItemRef,
        ItemNameRef,
        ItemOnEdition,
        toggle_completedItem,
        leftSideRef,
        toggleCoverRef,
        toggle_onWorkingItem,
        setItemEditable
    }
}