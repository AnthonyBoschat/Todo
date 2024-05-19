import { useSelector } from "react-redux";
import usePopup from "../Components/Popup/usePopup";
import useFolder_Request from "../Components/Folder/FolderAction";
import useItem_Action from "../Components/Item/ItemAction";
import useUser_Action from "../Components/User/UserAction";
import useDevtoolsRequest from "../Components/DevTools/DevtoolsRequest";
import useCollection_Action from "../Components/Collection/CollectionAction";
import useProperty_Action from "../Components/Property/PropertyActions";
const backend_url = process.env.REACT_APP_BACKEND_URL

export default function useFetchRequest(){

    const debugConsole = useSelector(store => store.devtools.debugConsole)
    const debugPopup = useSelector(store => store.devtools.debugPopup)
    const {popup} = usePopup()
    const {folderAction} = useFolder_Request()
    const {itemAction} = useItem_Action()
    const {userAction, recoveryAction} = useUser_Action()
    const {devtoolAction} = useDevtoolsRequest()
    const {collectionAction} = useCollection_Action()
    const {propertyAction} = useProperty_Action()


    const determineTarget = (route, data) => {
        const formatedRoute = route.split("/")
        const target = formatedRoute[0]
        const action = formatedRoute[1]
        switch(target){
            case "folder":
                if(folderAction[action]){
                    folderAction[action](data)
                }
                break

            case "item":
                if(itemAction[action]){
                    itemAction[action](data)
                }
                break

            case "user":
                if(userAction[action]){
                    userAction[action](data)
                }
                break

            case "recovery":
                if(recoveryAction[action]){
                    recoveryAction[action](data)
                }

            case "collection":
                if(collectionAction[action]){
                    collectionAction[action](data)
                }
                break

            case "devtool":
                if(devtoolAction[action]){
                    devtoolAction[action](data)
                }
                break

            case "property":
                if(propertyAction[action]){
                    propertyAction[action](data)
                }
                break

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
    
            const response = await fetch(`${backend_url}/${route}`, fetchOptions);
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
            if(debugConsole && error.messageDebugConsole) console.log(error.messageDebugConsole);
            if(debugPopup && error.messageDebugPopup) popup({message: error.messageDebugPopup, color: "debug"});
            console.log(error.message)
            // throw error; // Relance l'erreur pour la gestion d'erreur côté appelant.
        }
    }
    return{
        fetchRequest
    }
}