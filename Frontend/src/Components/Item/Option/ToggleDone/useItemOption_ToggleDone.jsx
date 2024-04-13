import React, {} from "react";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useItemOption_ToggleDone(Item, toggleCoverRef){

    const {fetchRequest} = useFetchRequest()

    const handleClick = () => { 
        const ItemID = Item._id
        const doneValue = !Item.completed
        if(!doneValue){
            toggleCoverRef.current.classList.add("coverReturn")
            setTimeout(async() => {
                await fetchRequest("PUT", `item/toggleCompleted/${ItemID}`, {completed:doneValue})
                toggleCoverRef.current.classList.remove("coverReturn")
            }, 100);
        }
        if(doneValue){
            fetchRequest("PUT", `item/toggleCompleted/${ItemID}`, {completed:doneValue})
        }
    }

    return{
        handleClick
    }
}