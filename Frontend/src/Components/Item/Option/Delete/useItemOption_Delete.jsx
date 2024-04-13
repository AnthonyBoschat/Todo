import React, { useState } from "react";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useItemOption_Delete(Item){

    const {fetchRequest} = useFetchRequest()

    const handleClick = () => {
        const confirmation = window.confirm("Delete this Item ?")
        if(confirmation){
            const ItemID = Item._id
            fetchRequest("DELETE", `Item/delete/${ItemID}`)
        }
    }


    return{
        handleClick,
    }
}