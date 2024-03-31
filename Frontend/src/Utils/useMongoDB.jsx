import { useSelector } from "react-redux";
import useBackend from "./useBackend";
import { update_folderOnCreation } from "../Components/Folder/FolderSlice";
import { useDispatch } from "react-redux";

// Toute modificaiton du localStorage passe par ce hook
export default function useMongoDB(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const {fetchRequest} = useBackend()


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FONCTION
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre un utilisateur
    const mongoDB_saveNewUser = (newUser) => {
        fetchRequest("POST", {
            route:"/users/create",
            body:newUser,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Connecte un utilisateur
    const mongoDB_connectUser = (user) => {
        fetchRequest("POST", {
            route:`/users/connect`,
            body:user,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Déconnecte un utilisateur
    const mongoDB_disconnectUser = () => {
        fetchRequest("GET", {
            route:"/users/disconnect"
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Reconnecte un utilisateur
    const mongoDB_reconnectUser = () => {
        return new Promise((resolve,reject) => {
            fetchRequest("GET", {
                route:"/users/reconnect",
                finaly: () => resolve()
            })
        })
    }

    const mongoDB_getAllData = () => {
        return new Promise(resolve => {
            fetchRequest("GET", {
                route:"/users/getAllData",
                finaly: () => resolve()
            })
        })
    }


    

















    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre un dossier

    const mongoDB_saveNewFolder = (newFolder) => {
        return new Promise((resolve) => {
            fetchRequest("POST", {
                route:"/folders/create",
                body: newFolder,
                finaly: () => resolve()
            })
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime un dossier

    const mongoDB_deleteFolder = () => {
        fetchRequest("DELETE", {
            route:`/folders/delete/${folderSelectedID}`,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Renomme un dossier

    const mongoDB_renameFolder = (newFolderName) => {
        fetchRequest("PUT", {
            route:`/folders/rename/${folderSelectedID}`,
            body:{newFolderName},
        })
    }

    const mongoDB_getFolder = (newFolderName) => {
        fetchRequest("GET", {
            route:`/folders/getAll/${userID}`,
            body:{newFolderName},
        })
    }























    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre une tâche

    const mongoDB_saveNewTask = (newTask) => {
        fetchRequest("POST", {
            route:"/tasks/create",
            body:newTask,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Supprime une tâche
    const mongoDB_deleteTask = (taskID) => {
        fetchRequest("DELETE", {
            route:`/tasks/delete/${taskID}`,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Renomme une tâche
    const mongoDB_renameTask = (taskID, newTaskContent) => {
        fetchRequest("PUT", {
            route:`/tasks/rename/${taskID}`,
            body:{newTaskContent},
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Toggle une tâche
    const mongoDB_toggleCompletedTask = (taskID, taskCompleted) => {
        return new Promise((resolve) => {
            fetchRequest("PUT", {
                route:`/tasks/toggleCompleted/${taskID}`,
                body:{completed:taskCompleted},
                finaly:() => resolve()
            })
        })
    }

    const mongoDB_onWorkingTask = (taskID, newValueTaskonWorking) => {
        return new Promise((resolve) => {
            fetchRequest("PUT", {
                route:`/tasks/toggleOnWorking/${taskID}`,
                body:{onWorking:newValueTaskonWorking},
                finaly:() => resolve()
            })
        })
        
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Récupère les tâches
    const mongoDB_getTask = () => {
        fetchRequest("GET", {
            route:`/tasks/getAll/${folderSelectedID}`,
        })
    }
    

    return{
        mongoDB_saveNewFolder,
        mongoDB_deleteFolder,
        mongoDB_renameFolder,
        mongoDB_getFolder,

        mongoDB_toggleCompletedTask,
        mongoDB_getTask,
        mongoDB_saveNewTask,
        mongoDB_deleteTask,
        mongoDB_renameTask,
        mongoDB_onWorkingTask,

        mongoDB_saveNewUser,
        mongoDB_connectUser,
        mongoDB_disconnectUser,
        mongoDB_reconnectUser,
        mongoDB_getAllData,
    }
}