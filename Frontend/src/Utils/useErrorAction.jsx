import React, {} from "react";
import usePopup from "../Components/Popup/usePopup";
import { useDispatch } from "react-redux";

export default function useErrorAction(){

    const dispatch = useDispatch()
    const {popup} = usePopup()

    const errorAction = (route, payload) => {
        switch(route){
            
            case "/users/create":
                popup({
                    message:"This username is already used. Please try with another username.",
                    color:"bad"
                })
                break
            
            case "/users/connect":
                popup({
                    message:"userName or Password incorrect",
                    color:"bad"
                })
                break

            default:
                return
        }
    }

    return{
        errorAction
    }
}