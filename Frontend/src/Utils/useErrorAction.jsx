import React, {} from "react";
import usePopup from "../Components/Popup/usePopup";
import { useDispatch } from "react-redux";

export default function useErrorAction(){

    const dispatch = useDispatch()
    const {popup} = usePopup()

    const errorAction = (route, payload) => {
        switch(route){
            
            case "/users/create":
                break
            
            case "/users/connect":
                break

            default:
                return
        }
    }

    return{
        errorAction
    }
}