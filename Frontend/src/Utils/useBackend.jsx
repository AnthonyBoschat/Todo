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
        if(method === "POST" || "PUT"){
            fetchOptions.headers["Content-Type"] = "application/json"
            fetchOptions.body = JSON.stringify(request.body)
        }
        fetch(`${backendURL}${request.route}`, fetchOptions)
        .then(response => response.json())
        .then(result => {
            if(fetchConsoleMessage){console.log(result.message)}
            if(request.finalAction){request.finalAction(result.payload)}
        })
        .catch(error => {
            console.log(error.message)
            console.error(error.payload)
        })
    }
    return{
        fetchRequest
    }
}