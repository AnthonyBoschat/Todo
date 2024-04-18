import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertyOnCreation } from "./PropertySlice";

export default function Property_Manager(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const dispatch = useDispatch()
    

    


    useEffect(() => {
        dispatch(update_propertyOnCreation(false))
    }, [folderSelectedID])


    return{
        
    }
}