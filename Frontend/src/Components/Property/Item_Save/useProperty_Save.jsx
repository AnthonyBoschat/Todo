import React, {} from "react";
import { useSelector } from "react-redux";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useProperty_Save(propertyState, item){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const {fetchRequest} = useFetchRequest()
    
    const handleClick = () => {
        const propertyName = propertyState.propertyName
        const propertyValue = propertyState.propertyValue
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
        handleClick
    }
}