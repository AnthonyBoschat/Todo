import React, {} from "react";
import { useSelector } from "react-redux";

export default function useBackend(){

    const backendURL = "http://localhost:4000"
    const fetchConsoleMessage = useSelector(store => store.backend.fetchConsoleMessage)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ROUTER
    const fetchRequest = (method, request) => {
        const fetchOptions = {
            method:method,
            headers:{}
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
                if(fetchConsoleMessage){console.log(data.message)}
                if(request.finalAction){request.finalAction(data.payload)}
            }
        })
        .catch(error => {
            if(fetchConsoleMessage){console.log(error.message)}
            if(request.popupAction){request.popupAction()}
        })
    }
    return{
        fetchRequest
    }
}