import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { update_propertyOnCreation } from "../PropertiesSlice";

export default function Properties_Add(){

    const dispatch = useDispatch()
    const propertyOnCreation = useSelector(store => store.properties.propertyOnCreation)

    

    return(
        <div className="propertiesAdd_Display">
            <div onClick={() => dispatch(update_propertyOnCreation(!propertyOnCreation))} className="propertiesAdd_Box">
                <i className="fa-solid fa-plus addProperty"></i>
                <span>New property</span>
            </div>
            <div className="propertiesSave_Box">
                <i className="fa-solid fa-floppy-disk"></i>
            </div>
        </div>
    )
}