import React, {} from "react";
import {useDispatch, useSelector} from "react-redux"
import { update_addData, update_addPropertyItem, update_changeData, update_dataList, update_deleteData, update_updatePropertyItem } from "../User/UserSlice";
import { update_propertyOnCreation } from "./PropertySlice";

export default function useProperty_Action(){

    const dispatch = useDispatch()
    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const userPropertyList = useSelector(store => store.user.datas.userPropertyList)

    const propertyAction = {
        create:(newProperty) => {
            dispatch(update_addData({listName:"userPropertyList", newData:newProperty}))
            dispatch(update_propertyOnCreation(false))
            dispatch(update_addPropertyItem(newProperty))

        },


        delete:(data) => {
            const {propertyID, folderSelectedID} = data
            // On supprime la propriété de la liste des propriété
            const propertyIndex = userPropertyList.findIndex(property => property._id === propertyID)
            dispatch(update_deleteData({listName:"userPropertyList", dataIndex:propertyIndex}))

            // On supprime cette propriété des items maintenants
            const newUserItemsList = userItemsList.map(item => {
                if(item.folderID === folderSelectedID){
                    const filteredProperties = item.properties.filter(property => property.propertyID !== propertyID)
                    return {
                        ...item,
                        properties:filteredProperties
                    }
                }
                return item
            })
            dispatch(update_dataList({listName:"userItemsList", newList:newUserItemsList}))
        },


        updateItem:(data) => {
            const {itemID, updateList} = data
            dispatch(update_updatePropertyItem({itemID, updateList}))
        }
    }

    return{
        propertyAction
    }
}