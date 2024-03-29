import React, {} from "react";
import { useSelector } from "react-redux";
import usePopup from "../Components/Popup/usePopup";
import useFinalAction from "./useFinalAction";
import useErrorAction from "./useErrorAction";

export default function useBackend(){

    const backendURL = "http://localhost:4000"
    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const {popup} = usePopup()
    const {finalAction} = useFinalAction()
    const {errorAction} = useErrorAction()

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ROUTER
    const fetchRequest = (method, request) => {
        const fetchOptions = {
            method:method,
            headers:{},
            credentials:"include",
        }
        if(method === "POST" || method === "PUT"){
            fetchOptions.headers["Content-Type"] = "application/json"
            fetchOptions.body = JSON.stringify(request.body)
        }
        
        fetch(`${backendURL}${request.route}`, fetchOptions)
        .then(response => Promise.all([response.ok, response.json()]))
        .then(([ok, data]) => {
            if(!ok){
                throw data
            }
            else{
                if(debugConsole){
                    console.log(data.message)
                }
                if(debugPopup){popup({
                    message:data.message,
                    color:"debug",
                    hidden:false
                })}
                if(request.finalAction){
                    request.finalAction(data.payload)
                }
                if(data.finalAction){
                    finalAction(data.finalAction, data.payload)
                }
            }
        })
        .catch(error => {
            if(debugConsole){
                console.log(error.message)
            }
            if(debugPopup){popup({
                message:error.popup,
                color:"debug",
                hidden:false
            })}
            if(request.errorAction){
                request.errorAction(error.message)
            }
            if(error.errorAction){
                errorAction(error.errorAction, error.popup)
            }
        })
        
    }
    return{
        fetchRequest
    }
}