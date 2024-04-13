import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_listOnCreation } from "./ListSlice";
import { update_addData } from "../User/UserSlice";

export default function useList_Action(){

    const dispatch = useDispatch()

    const listAction = {
        create:(data) => {
            dispatch(update_addData({listName:"userListsList", newData:data}))
            dispatch(update_listOnCreation(false))
        },
    }

    return{
        listAction
    }
}