import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { update_propertyCanBeSaved, update_propertyOnCreation } from "../../PropertiesSlice";

export default function Properties_Add({propertyState, propertyDispatch}){

    const handleClick = () => {
        propertyDispatch({type:"onCreation", payload:!propertyState.onCreation})
        propertyDispatch({type:"canBeSaved", payload:!propertyState.canBeSaved})
    }

    return(
        <div onClick={handleClick} className="propertiesAdd_Box">
            <i className="fa-solid fa-plus addProperty"></i>
            <span>New property</span>
        </div>
    )
}