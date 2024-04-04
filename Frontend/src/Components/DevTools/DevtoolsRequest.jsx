import React, {} from "react";
import useFetchRequest from "../../Utils/useFetchRequest";
import { useDispatch } from "react-redux";
import { update_DELETE_ALL_DATAS, update_allDatasLoad, update_dataList } from "../User/UserSlice";
import { update_folderSelectedID } from "../Folder/FolderSlice";
import { update_closeConnection } from "../Connection/ConnectionSlice";

export default function useDevtoolsRequest(){

    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()




    const devtoolsRequest_DELETE_ALL_TASKS = async(folderSelectedID) => {
        try{
            const {ok, data} = await fetchRequest("DELETE", {
                route: `/devtool/DELETE_ALL_TASKS/${folderSelectedID}`
            })
            if(ok){
                dispatch(update_dataList({listName:"userTasksList", newList:data}))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la suppression de toutes les tâches de ce dossier:", error)
        }
    }





    const devtoolsRequest_DELETE_ALL_FOLDERS = async(userID) => {
        try{
            const {ok} = await fetchRequest("DELETE", {
                route: `/devtool/DELETE_ALL_FOLDERS/${userID}`
            })
            if(ok){
                dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la supression de toutes les tâches de l'utilisateur:", error)
        }
    }





    const devtoolsRequest_DELETE_ALL_USERS = async() => {
        try{
            const {ok} = await fetchRequest("DELETE", {
                route: `/devtool/DELETE_ALL_USERS`
            })
            if(ok){
                dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
                dispatch(update_allDatasLoad(false))
                dispatch(update_closeConnection())
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la suppression de tout les utilisateurs:", error)
        }
    }





    const devtoolsRequest_DELETE_THIS_USER = async(userID) => {
        try{
            const {ok} = await fetchRequest("DELETE", {
                route: `/devtool/DELETE_THIS_USER/${userID}`
            })
            if(ok){
                dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
                dispatch(update_allDatasLoad(false))
                dispatch(update_closeConnection())
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la supression de cet utilisateur:", error)
        }
    }

    return{
        devtoolsRequest_DELETE_ALL_TASKS,
        devtoolsRequest_DELETE_ALL_FOLDERS,
        devtoolsRequest_DELETE_ALL_USERS,
        devtoolsRequest_DELETE_THIS_USER
    }
}