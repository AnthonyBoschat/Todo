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
        <div className={`propertiesSave_Box ${itemPropertyState.updateDetected ? "active" : "inactive"}`}>
            <i onClick={handleClick} className="fa-solid fa-floppy-disk"></i>
        </div>
    )
}