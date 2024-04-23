import React, { useReducer } from "react";

export default function useList_One(){

    const initialState = {
        listVisible:false
    }

    const initialStateReducer = (state, action) => {
        switch(action.type){
            case "listVisible":
                return {...state, listVisible:action.payload}
            default:
                return
        }
    }

    const [listState, dispatchListState] = useReducer(initialStateReducer, initialState)

    const handleClick = () => {
        dispatchListState({type:"listVisible", payload:!listState.listVisible})
    }

    return{
        listState,
        dispatchListState,
        handleClick
    }
}