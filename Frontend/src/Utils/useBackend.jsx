import React, {} from "react";
import { useSelector } from "react-redux";
import usePopup from "../Components/Popup/usePopup";

export default function useBackend(){

    const backendURL = "http://localhost:4000"
    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const {popup} = usePopup()

    const objectRequest = {
        method:"POST/GET/DELETE/PUT",
        action:"create/rename/delete",
        target:"task/folder/user",
        body:"body",

    }

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
            if(!ok){throw new Error(data.message || 'Une erreur inconnue est survenue')}
            else{
                if(debugConsole){console.log(data.message)}
                if(debugPopup){popup({
                    message:data.message,
                    color:"debug",
                    hidden:false
                })}
                if(request.finalAction){request.finalAction(data.payload)}
            }
        })
        .catch(error => {
            if(debugConsole){console.log(error.message)}
            if(debugPopup){popup({
                message:error.message,
                color:"debug",
                hidden:false
            })}
            if(request.errorAction){request.errorAction(error.message)}
        })
        
    }
    return{
        fetchRequest
    }
}