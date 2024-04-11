import { useSelector } from "react-redux";
import usePopup from "../Components/Popup/usePopup";
import useFolder_Request from "../Components/Folder/FolderAction";
import useTask_Request from "../Components/Task/TaskRequest";
import useUser_Request from "../Components/User/UserRequest";

export default function useFetchRequest(){

    const backendURL = "http://localhost:4000"
    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const {popup} = usePopup()
    const {folderAction} = useFolder_Request()
    const {taskAction} = useTask_Request()
    const {userAction} = useUser_Request()


    const determineTarget = (route, data) => {
        const formatedRoute = route.split("/")
        const target = formatedRoute[0]
        const action = formatedRoute[1]
        switch(target){
            case "folder":
                folderAction[action](data)
                break

            case "task":
                taskAction[action](data)
                break

            case "user":
                userAction[action](data)
        }
    }

    const fetchRequest = async (method, route, payload=null) => {
        try {
            const fetchOptions = {
                method: method,
                headers: {},
                credentials: "include",
            };
            if(method === "POST" || method === "PUT"){
                fetchOptions.headers["Content-Type"] = "application/json";
                fetchOptions.body = JSON.stringify(payload);
            }
    
            const response = await fetch(`${backendURL}/${route}`, fetchOptions);
            const [ok, data] = await Promise.all([response.ok, response.json()]);
            if(!ok){
                throw data;
            }
            if(data.messageUserPopup) popup({message: data.messageUserPopup, color: "good"});
            if(debugConsole) console.log(data.messageDebugConsole);
            if(debugPopup) popup({message: data.messageDebugPopup, color: "debug"});
            determineTarget(route, data.payload)
            return {
                ok:ok,
                data: data.payload ? data.payload : null
            }
            
    
        } catch (error){
            if(error.messageUserPopup) popup({message: error.messageUserPopup, color: "bad"});
            if(debugConsole) console.log(error.messageDebugConsole);
            if(debugPopup) popup({message: error.messageDebugPopup, color: "debug"});
            // throw error; // Relance l'erreur pour la gestion d'erreur côté appelant.
        }
    }
    return{
        fetchRequest
    }
}