import React, {} from "react";
import {useDispatch} from "react-redux"
import { update_addData, update_dataList } from "../User/UserSlice";
import { update_propertyOnCreation } from "./PropertySlice";

export default function useProperty_Action(){

    const dispatch = useDispatch()

    const propertiesAction = {
        create:(data) => {
            dispatch(update_addData({listName:"userPropertyList", newData:data}))
            dispatch(update_propertyOnCreation(false))
        }
    }

    return{
        propertiesAction
    }
}