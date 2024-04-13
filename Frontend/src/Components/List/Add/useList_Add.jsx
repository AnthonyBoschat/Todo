import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_listOnCreation } from "../ListSlice";

export default function useList_Add(){

    const dispatch = useDispatch()
    const listOnCreation = useSelector(store => store.list.listOnCreation)

    const handleClick = () => {
        dispatch(update_listOnCreation(!listOnCreation))
    }

    return{
        handleClick
    }
}