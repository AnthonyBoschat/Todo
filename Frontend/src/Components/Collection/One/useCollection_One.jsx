import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_collectionWhoWhantItems } from "../CollectionSlice";

export default function useList_One(){

    const dispatch = useDispatch()
    const collectionWhoWhantItems = useSelector(store => store.collection.collectionWhoWhantItems)

    const initialState = {
        collectionVisible:false
    }

    const initialStateReducer = (state, action) => {
        switch(action.type){
            case "collectionVisible":
                return {...state, collectionVisible:action.payload}
            default:
                return
        }
    }

    const [collectionState, dispatchCollectionState] = useReducer(initialStateReducer, initialState)

    const handleClick = (e) => {
        if(e.target.localName !== "i"){
            dispatchCollectionState({type:"collectionVisible", payload:!collectionState.collectionVisible})
        }
    }

    const addItem = (collection) => {
        const thisCollectionID = collection._id
        if(!collectionWhoWhantItems.some(collectionID => collectionID === thisCollectionID)){
            dispatch(update_collectionWhoWhantItems({type:"push", thisCollectionID}))
        }
        if(collectionWhoWhantItems.some(collectionID => collectionID === thisCollectionID)){
            dispatch(update_collectionWhoWhantItems({type:"delete", thisCollectionID}))
        }
    }

    return{
        collectionState,
        handleClick,
        addItem,
        collectionWhoWhantItems
    }
}