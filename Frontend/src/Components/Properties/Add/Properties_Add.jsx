import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { update_propertyOnCreation } from "../PropertiesSlice";
import Properties_Save from "../Save/Properties_Save";

export default function Properties_Add(){

    const dispatch = useDispatch()
    const propertyOnCreation = useSelector(store => store.properties.propertyOnCreation)

    

    return(
        <div onClick={() => dispatch(update_propertyOnCreation(!propertyOnCreation))} className="propertiesAdd_Box">
            <i className="fa-solid fa-plus addProperty"></i>
            <span>New property</span>
        </div>
    )
}