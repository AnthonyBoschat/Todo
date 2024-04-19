import React, {} from "react";
import {useDispatch, useSelector} from "react-redux"
import { update_addData, update_dataList } from "../User/UserSlice";
import { update_propertyOnCreation } from "./PropertySlice";

export default function useProperty_Action(){

    const dispatch = useDispatch()
    const userItemsList = useSelector(store => store.user.datas.userItemsList)

    const propertyAction = {
        create:(newProperty) => {
            dispatch(update_addData({listName:"userPropertyList", newData:newProperty}))
            dispatch(update_propertyOnCreation(false))
            
            const newUserItemsList = userItemsList.map(item => {
                if(item.folderID === newProperty.folderID){
                    return {
                        ...item,
                        properties:[
                            ...item.properties,
                            {
                                propertyID:newProperty._id,
                                name:newProperty.name,
                                value:"N/A"
                            }
                        ]
                    }
                }
                return item
            })
            dispatch(update_dataList({listName:"userItemsList", newList:newUserItemsList}))

        }
    }

    return{
        propertyAction
    }
}