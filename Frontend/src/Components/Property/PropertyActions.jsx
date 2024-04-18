import React, {} from "react";
import {useDispatch} from "react-redux"
import { update_dataList } from "../User/UserSlice";

export default function useProperty_Action(){

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