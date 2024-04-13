import React, { useState } from "react";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useItemOption_Delete(item){

    const {fetchRequest} = useFetchRequest()

    const handleClick = () => {
        const confirmation = window.confirm("Delete this Item ?")
        if(confirmation){
            const itemID = item._id
            fetchRequest("DELETE", `item/delete/${itemID}`)
        }
    }


    return{
        handleClick,
    }
}