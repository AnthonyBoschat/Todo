import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Folder/FolderSlice";
import { update_addTask, update_deleteTask, update_loadTasksList, update_renameTask, update_taskList, update_taskOnCreation, update_toggleTask } from "../Components/Task/TaskSlice";
import {update_closeConnection, update_connected, update_connectedUser} from "../Components/Connection/ConnectionSlice"
import useBackend from "./useBackend";
import usePopup from "../Components/Popup/usePopup";

// Toute modificaiton du localStorage passe par ce hook
export default function useMongoDB(){

    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const dispatch = useDispatch()
    const {fetchRequest} = useBackend()
    const {popup} = usePopup()


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


    

















    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistrer un nouveau dossier

    const mongoDB_saveNewFolder = (newFolder) => {
        fetchRequest("POST", {
            route:"/folders/create",
            body: newFolder,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'un dossier

    const mongoDB_deleteFolder = () => {
        fetchRequest("DELETE", {
            route:`/folders/delete/${folderSelectedID}`,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'un dossier

    const mongoDB_renameFolder = (newFolderName) => {
        fetchRequest("PUT", {
            route:`/folders/rename/${folderSelectedID}`,
            body:{newFolderName},
        })
    }























    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre une nouvelle tâche

    const mongoDB_saveNewTask = (newTask) => {
        fetchRequest("POST", {
            route:"/tasks/create",
            body:newTask,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'une tâche
    const mongoDB_deleteTask = (taskID) => {
        fetchRequest("DELETE", {
            route:`/tasks/delete/${taskID}`,
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'une task
    const mongoDB_renameTask = (taskID, newTaskContent) => {
        fetchRequest("PUT", {
            route:`/tasks/rename/${taskID}`,
            body:{newTaskContent},
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le toggle d'une tâche
    const mongoDB_toggleTask = (taskID, taskCompleted) => {
        fetchRequest("PUT", {
            route:`/tasks/toggle/${taskID}`,
            body:{completed:taskCompleted},
        })
    }

    const mongoDB_getTask = () => {
        fetchRequest("GET", {
            route:`/tasks/getAll/${folderSelectedID}`,
        })
    }
    

    return{
        mongoDB_saveNewFolder,
        mongoDB_deleteFolder,
        mongoDB_renameFolder,

        mongoDB_toggleTask,
        mongoDB_getTask,
        mongoDB_saveNewTask,
        mongoDB_deleteTask,
        mongoDB_renameTask,

        mongoDB_saveNewUser,
        mongoDB_connectUser,
        mongoDB_disconnectUser,
        mongoDB_reconnectUser,
    }
}