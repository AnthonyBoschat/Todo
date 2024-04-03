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
    // const fetchRequest = (method, request) => {
    //     const fetchOptions = {
    //         method:method,
    //         headers:{},
    //         credentials:"include",
    //     }
    //     if(method === "POST" || method === "PUT"){
    //         fetchOptions.headers["Content-Type"] = "application/json"
    //         fetchOptions.body = JSON.stringify(request.body)
    //     }
        
    //     fetch(`${backendURL}${request.route}`, fetchOptions)
    //     .then(response => Promise.all([response.ok, response.json()]))
    //     .then(([ok, data]) => {
    //         if(!ok){
    //             throw data
    //         }
    //         else{
    //             if(data.messageUserPopup)(popup({message:data.messageUserPopup, color:"good"}))
    //             if(debugConsole){console.log(data.messageDebugConsole)}
    //             if(debugPopup){popup({message:data.messageDebugPopup,color:"debug"})}
    //             if(data.payload.finalAction === "folder/create"){
    //                 return data.payload
    //             }
    //             if(data.payload.finalAction){finalAction(data.payload)}
    //             if(request.finaly){request.finaly()}
    //         }
    //     })
    //     .catch(error => {
    //         if(error.messageUserPopup)(popup({message:error.messageUserPopup, color:"bad"}))
    //         if(debugConsole){console.log(error.messageDebugConsole)}
    //         if(debugPopup){popup({message:error.messageDebugPopup,color:"debug"})}
    //         if(error.errorAction){errorAction(error.errorAction, error.popup)}
    //         if(request.finaly){request.finaly()}
    //     })
        
    // }


    const fetchRequest = async (method, request) => {
        try {
            const fetchOptions = {
                method: method,
                headers: {},
                credentials: "include",
            };
            if(method === "POST" || method === "PUT"){
                fetchOptions.headers["Content-Type"] = "application/json";
                fetchOptions.body = JSON.stringify(request.body);
            }
    
            const response = await fetch(`${backendURL}${request.route}`, fetchOptions);
            const [ok, data] = await Promise.all([response.ok, response.json()]);
            if(!ok){
                throw data;
            }
            if(data.messageUserPopup) popup({message: data.messageUserPopup, color: "good"});
            if(debugConsole) console.log(data.messageDebugConsole);
            if(debugPopup) popup({message: data.messageDebugPopup, color: "debug"});
            
            if(!data.payload.finalAction){
                return {
                    ok:ok,
                    data:data.payload
                }
            }
    
            if(data.payload.finalAction) finalAction(data.payload);
            if(request.finaly) request.finaly();
    
        } catch (error){
            if(error.messageUserPopup) popup({message: error.messageUserPopup, color: "bad"});
            if(debugConsole) console.log(error.messageDebugConsole);
            if(debugPopup) popup({message: error.messageDebugPopup, color: "debug"});
            if(error.errorAction) errorAction(error.errorAction, error.popup);
            if(request.finaly) request.finaly();
            
            throw error; // Relance l'erreur pour la gestion d'erreur côté appelant.
        }
    }
    return{
        fetchRequest
    }
}