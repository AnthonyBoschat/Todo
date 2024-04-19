import React, { useEffect, useReducer } from "react";

export default function Item_Property_Manager(item){

    const initialItemPropertyState = {
        updateDetected:false,
        itemName:item.content,
        itemID:item._id,
        updateList:{},
    }

    const initialItemPropertyStateReducer = (state, action) => {
        let newUpdateList
        switch(action.type){
            case "updateDetected":
                return {...state, updateDetected:action.payload}

            case "updateList":
                newUpdateList = {...state.updateList}
                newUpdateList[action.payload.propertyID] = action.payload.newValue
                return {...state, updateList:newUpdateList}

            case "removeUpdate":
                newUpdateList = {...state.updateList}
                delete newUpdateList[action.payload]
                if(Object.keys(newUpdateList).length === 0){
                    return {...state, updateList:newUpdateList, updateDetected:false}
                }else{
                    return {...state, updateList:newUpdateList}
                }

        }
    }

    const [itemPropertyState, disaptchItemPropertyState] = useReducer(initialItemPropertyStateReducer, initialItemPropertyState)

    return{
        itemPropertyState,
        disaptchItemPropertyState
    }
}