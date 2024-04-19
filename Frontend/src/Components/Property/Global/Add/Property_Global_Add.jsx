import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertyOnCreation } from "../../PropertySlice";

export default function Property_Global_Add({propertyState, propertyDispatch}){

    const propertyOnCreation = useSelector(store => store.property.propertyOnCreation)
    const dispatch = useDispatch()

    return(
        <>
            <i onClick={() => dispatch(update_propertyOnCreation(!propertyOnCreation))} className="fa-solid fa-plus addProperty"></i>
            <span onClick={() => dispatch(update_propertyOnCreation(!propertyOnCreation))}>New property</span>
        </>
        
    )
}