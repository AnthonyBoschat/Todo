import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_ItemOnCreation } from "../ItemSlice";
import { useSelector } from "react-redux";

export default function useItem_Add(){

    const dispatch = useDispatch()
    const ItemOnCreation = useSelector(store => store.item.ItemOnCreation)

    const addItem = () => {
        dispatch(update_ItemOnCreation(!ItemOnCreation))
    }

    return{
        addItem
    }
}