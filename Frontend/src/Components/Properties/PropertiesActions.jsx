import React, {} from "react";
import {useDispatch} from "react-redux"
import { update_addPropertiesToShow, update_propertyOnCreation } from "./PropertiesSlice";
import { update_addData } from "../User/UserSlice";

export default function useProperties_Action(){

    const dispatch = useDispatch()

    const propertiesAction = {
        create:(data) => {
            dispatch(update_propertyOnCreation(false))
            dispatch(update_addData({listName:"userPropertiesList", newData:data}))
            // dispatch(update_addPropertiesToShow(data))
        }
    }

    return{
        propertiesAction
    }
}