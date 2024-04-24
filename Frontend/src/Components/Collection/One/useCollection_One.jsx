import React, { useReducer } from "react";

export default function useList_One(){

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

    const handleClick = () => {
        dispatchCollectionState({type:"collectionVisible", payload:!collectionState.collectionVisible})
    }

    return{
        collectionState,
        dispatchCollectionState,
        handleClick
    }
}