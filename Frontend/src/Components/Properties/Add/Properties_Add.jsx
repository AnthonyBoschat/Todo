import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { update_propertyCanBeSaved, update_propertyOnCreation } from "../PropertiesSlice";
import Properties_Save from "../Save/Properties_Save";

export default function Properties_Add({propertyCanBeSaved, setPropertyCanBeSaved, setPropertyOnCreation, propertyOnCreation}){

    const handleClick = () => {
        setPropertyOnCreation(!propertyOnCreation)
        setPropertyCanBeSaved(!propertyCanBeSaved)
    }

    return(
        <div onClick={handleClick} className="propertiesAdd_Box">
            <i className="fa-solid fa-plus addProperty"></i>
            <span>New property</span>
        </div>
    )
}