import React from "react";

export default function Property_Tab_Add({propertyState, propertyDispatch}){

    const handleClick = () => {
        propertyDispatch({type:"onCreation", payload:!propertyState.onCreation})
        propertyDispatch({type:"canBeSaved", payload:!propertyState.canBeSaved})
    }

    return(
        <>
            <i onClick={handleClick} className="fa-solid fa-plus addProperty"></i>
            <span onClick={handleClick}>New property</span>
        </>
        
    )
}