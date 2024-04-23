import React from "react";
import useProperty_Save from "./useProperty_Save";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function Properties_Save({itemPropertyState, disaptchItemPropertyState}){

    const {fetchRequest} = useFetchRequest()

    const handleClick = () => {
        fetchRequest("PUT", "property/updateItem", itemPropertyState)
        disaptchItemPropertyState({type:"updateDetected", payload:false})
    }
    

    return(
        <i onClick={handleClick} className={`fa-solid fa-floppy-disk ${itemPropertyState.updateDetected ? "active" : "inactive"}`}></i>

    )
}