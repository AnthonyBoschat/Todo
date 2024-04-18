import React, {} from "react";
import {useDispatch} from "react-redux"
import { update_addData, update_dataList } from "../User/UserSlice";

export default function useProperties_Action(){

    const dispatch = useDispatch()

    const propertiesAction = {
        create:(data) => {
            dispatch(update_dataList({listName:"userItemsList", newList:data}))
        }
    }

    return{
        propertiesAction
    }
}