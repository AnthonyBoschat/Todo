import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertyOnCreation, update_propertyToShow } from "./PropertySlice";

export default function Property_Manager(item){

    const userPropertyList = useSelector(store => store.user.datas.userPropertyList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const propertyToShow = useSelector(store => store.property.propertyToShow)
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(update_propertyOnCreation(false))
        const newPropertyToShow = userPropertyList.filter(property => property.folderID === folderSelectedID)
        dispatch(update_propertyToShow(newPropertyToShow))
    }, [folderSelectedID, userPropertyList])


    return{
        propertyToShow
    }
}