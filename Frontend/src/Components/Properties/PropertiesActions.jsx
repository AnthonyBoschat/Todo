import React, {} from "react";
import {useDispatch} from "react-redux"
import { update_addData } from "../User/UserSlice";

export default function useProperties_Action(){

    const dispatch = useDispatch()

    const propertiesAction = {
        create:(data) => {
            dispatch(update_addData({listName:"userPropertiesList", newData:data}))
        }
    }

    return{
        propertiesAction
    }
}