import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertiesToShow } from "./PropertiesSlice";

export default function Properties_Manager(){

    const dispatch = useDispatch()
    const userPropertiesList = useSelector(store => store.user.datas.userPropertiesList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    useEffect(() => {
        if(folderSelectedID){
            const propertiesToShow = userPropertiesList.filter(property => property.folderID === folderSelectedID)
            dispatch(update_propertiesToShow(propertiesToShow))
        }
    }, [folderSelectedID, userPropertiesList])

    return{}
}