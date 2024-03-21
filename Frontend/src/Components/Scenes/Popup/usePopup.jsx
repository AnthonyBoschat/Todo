import React, {} from "react";
import { update_popup } from "./PopupSlice";
import { useDispatch } from "react-redux";

export default function usePopup(){

    const dispatch = useDispatch()

    const popup = async (newPopupConfiguration) => {
        await dispatch(update_popup({hidden:true}))
        newPopupConfiguration.hidden = false
        switch(newPopupConfiguration.color){
            case "neutral":
                newPopupConfiguration.color = "rgb(205, 205, 205)"
                break
            case "good":
                newPopupConfiguration.color = "rgb(115, 179, 115)"
                break
            case "bad" :
                newPopupConfiguration.color = "rgb(214, 165, 165)"
                break
            case "debug":
                newPopupConfiguration.color = "rgb(207, 165, 217)"
                break
        }
        dispatch(update_popup(newPopupConfiguration))
    }

    return{
        popup
    }
}