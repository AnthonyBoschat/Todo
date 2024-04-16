import React, {} from "react";
import { useSelector } from "react-redux";
import useFetchRequest from "../../../Utils/useFetchRequest"

export default function useProperties_Save(newPropertyName, newPropertyValue, item){

    const propertyOnCreation = useSelector(store => store.properties.propertyOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const {fetchRequest} = useFetchRequest()
    
    const handleClick = () => {
        const propertyName = newPropertyName
        const propertyValue = newPropertyValue
        const folderID = folderSelectedID
        const itemID = item._id
        const newProperty = {
            propertyName,
            propertyValue,
            folderID,
            itemID
        }
        fetchRequest("POST", "property/create", newProperty)
    }

    return{
        propertyOnCreation,
        handleClick
    }
}