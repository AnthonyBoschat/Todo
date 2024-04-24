import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_collectionOnCreation } from "../CollectionSlice";

export default function useCollection_Add(){

    const dispatch = useDispatch()
    const collectionOnCreation = useSelector(store => store.collection.collectionOnCreation)

    const handleClick = () => {
        dispatch(update_collectionOnCreation(!collectionOnCreation))
    }

    return{
        handleClick
    }
}