import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertiesToShow } from "./PropertiesSlice";

export default function Properties_Manager(){

    const dispatch = useDispatch()
    const userPropertiesList = useSelector(store => store.user.datas.userPropertiesList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const itemSelectedID = useSelector(store => store.item.itemSelectedID)
    const [propertyOnCreation, setPropertyOnCreation] = useState(false)
    const [propertyCanBeSaved, setPropertyCanBeSaved] = useState(false)
    const [newPropertyName, setNewPropertyName] = useState("")
    const [newPropertyValue, setNewPropertyValue] = useState("")

    useEffect(() => {
        if(folderSelectedID){
            const propertiesToShow = userPropertiesList.filter(property => property.folderID === folderSelectedID)
            dispatch(update_propertiesToShow(propertiesToShow))
        }
        setPropertyCanBeSaved(false)
        setPropertyOnCreation(false)
    }, [folderSelectedID, userPropertiesList])


    return{
        propertyCanBeSaved,
        setPropertyCanBeSaved,

        propertyOnCreation,
        setPropertyOnCreation,

        newPropertyName,
        setNewPropertyName,

        newPropertyValue,
        setNewPropertyValue
    }
}