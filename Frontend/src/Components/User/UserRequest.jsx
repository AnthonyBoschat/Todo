import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_closeConnection, update_connected, update_connectedUser, update_updateSignSelected } from "../Connection/ConnectionSlice";
import useFetchRequest from "../../Utils/useFetchRequest";
import { update_allDatasLoad, update_dataList, update_loadAllDatas } from "./UserSlice";
import { update_folderSelectedID } from "../Folder/FolderSlice";

export default function useUser_Request(){

    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    const userRequest_Create = async(newUser) => {
        try{
            const {ok, data} = await fetchRequest("POST", {
                route: "/user/create",
                body: newUser
            })
            if(ok){
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:data.userName,
                    _id:data._id
                }))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la création de l'utilisateur:", error)
        }
    }

    const userRequest_Connect = async(user) => {
        try{
            const {ok, data} = await fetchRequest("POST", {
                route: "/user/connect",
                body: user
            })
            if(ok){
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:data.userName,
                    _id:data._id
                }))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la connection de l'utilisateur:", error)
        }
    }

    const userRequest_Disconnect = async(newTask) => {
        try{
            const {ok} = await fetchRequest("GET", {
                route: "/user/disconnect",
            })
            if(ok){
                dispatch(update_dataList({listName:"userFoldersList", newList:[]}))
                dispatch(update_dataList({listName:"userTasksList", newList:[]}))
                dispatch(update_folderSelectedID(null))
                dispatch(update_allDatasLoad(false))
                dispatch(update_closeConnection())
                dispatch(update_updateSignSelected("signin"))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la deconnection de l'utilisateur:", error)
        }
    }

    const userRequest_Reconnect = async(newTask) => {
        try{
            const {ok, data} = await fetchRequest("GET", {
                route: "/user/reconnect"
            })
            if(ok){
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:data.userName,
                    _id:data._id
                }))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la reconnection de l'utilisateur:", error.message)
        }
    }

    const userRequest_LoadDatas = async(newTask) => {
        try{
            const {ok, data} = await fetchRequest("GET", {
                route: "/user/loadDatas"
            })
            if(ok){
                const {newUserFoldersList, newUserTasksList} = data
                dispatch(update_loadAllDatas({newUserFoldersList, newUserTasksList}))
                dispatch(update_allDatasLoad(true))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la récup^ération des données de l'utilisateur:", error)
        }
    }

    return{
        userRequest_Reconnect,
        userRequest_LoadDatas,
        userRequest_Create,
        userRequest_Connect,
        userRequest_Disconnect
    }
}