import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../../../Utils/useFetchRequest";
import { update_ItemOnEdition } from "../../ItemSlice";

export default function useItemOption_Rename(ItemNameRef,ItemEditable,setItemEditable,leftSideRef,Item){

    const ItemOnEdition = useSelector(store => store.item.ItemOnEdition)
    const [optionSelected, setOptionSelected] = useState(false)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()
    

     // Click pour rendre la Item editable
     const toggleRenameItem = (ItemID) => {
        setOptionSelected(!optionSelected)
        if(!ItemEditable){
            setItemEditable(true)
            dispatch(update_ItemOnEdition(true))
        }
        if(ItemEditable && ItemOnEdition){
            const newItemContent = ItemNameRef.current.innerText
            fetchRequest("PUT", `item/rename/${ItemID}`, {newItemContent})
            setItemEditable(false)
        }
    }

    // Pour gérer la touche entrer pour la validation de Item
    useEffect(() => {
        if(ItemEditable && ItemNameRef.current){
            const handleKeyDown = (event) => {
                if(event.key === "Enter"){
                    if(event.shiftKey){
                        return
                    }else{
                        toggleRenameItem(Item._id)
                    }
                }
            }

            window.addEventListener("keydown", handleKeyDown)

            return () => window.removeEventListener("keydown", handleKeyDown)
        }
    }, [ItemEditable])


    // Afin de placer le focus et le curseur sur la Item qu'on souhaite modifier
    useEffect(() => {
        if(ItemEditable && ItemNameRef.current){
            ItemNameRef.current.focus()

            // Placer le curseur à la fin du span
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(ItemNameRef.current)
            range.collapse(false) 
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }, [ItemEditable])

    return{
        ItemEditable,
        toggleRenameItem,
        optionSelected
    }
}