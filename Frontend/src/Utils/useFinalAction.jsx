import React, {} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice";
import { update_closeConnection, update_connected, update_connectedUser } from "../Components/Connection/ConnectionSlice";
import { update_loadAllDatas, update_allDatasLoad, update_dataList, update_addData, update_deleteData, update_changeData, update_DELETE_ALL_DATAS } from "../Components/User/UserSlice";

export default function useFinalAction(){

    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const dispatch = useDispatch()

    const finalAction = (route, payload) => {
        let dataIndex
        switch(route){


            // Pour connecter un utilisateur
            case "connectUser":
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.userName,
                    _id:payload._id
                }))
                break
                
            // Pour déconnecter un utilisateur
            case "disconnectUser":
                dispatch(update_dataList({listName:"userFoldersList", newList:null}))
                dispatch(update_dataList({listName:"userTasksList", newList:null}))
                dispatch(update_folderSelectedID(null))
                dispatch(update_allDatasLoad(false))
                dispatch(update_closeConnection())
                break

            case "loadAllDatas":
                const newUserFoldersList = payload.userFoldersList
                const newUserTasksList = payload.userTasksList
                dispatch(update_loadAllDatas({userFoldersList:newUserFoldersList, userTasksList:newUserTasksList}))
                dispatch(update_allDatasLoad(true))
                break









            case "/folder/create":
                dispatch(update_addData({listName:"userFoldersList", newData:payload}))
                dispatch(update_folderSelectedID(payload._id))
                break

            case "/folder/delete":
                dataIndex = userFoldersList.findIndex(folder => folder._id === payload._id)
                dispatch(update_deleteData({listName:"userFoldersList", dataIndex:dataIndex}))
                dispatch(update_folderSelectedID(null))
                break

            case "/folder/rename":
                dataIndex = userFoldersList.findIndex(folder => folder._id === payload._id)
                dispatch(update_changeData({listName:"userFoldersList", dataIndex:dataIndex, newData:payload}))
                dispatch(update_folderSelectedName(payload.name))
                break

            case "/folder/DELETE_ALL_FOLDERS":
                dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
                break










                



            case "/tasks/create":
                dispatch(update_addData({listName:"userTasksList", newData:payload}))
                break

            case "/tasks/delete":
                dataIndex = userTasksList.findIndex(task => task._id === payload._id)
                dispatch(update_deleteData({listName:"userTasksList", dataIndex:dataIndex}))
                break
            
            case "/tasks/rename":
                dataIndex = userTasksList.findIndex(task => task._id === payload._id)
                dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:payload}))
                break


            case "/tasks/toggleCompleted":
                dataIndex = userTasksList.findIndex(task => task._id === payload._id)
                dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:payload}))
                break

            case "/tasks/toggleOnWorking":
                dataIndex = userTasksList.findIndex(task => task._id === payload.updatedTask._id)
                dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:payload.updatedTask}))
                if(payload.resetTask){
                    dataIndex = userTasksList.findIndex(task => task._id === payload.resetTask._id)
                    dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:payload.resetTask}))
                }
                break

            case "/tasks/DELETE_ALL_TASKS":
                dispatch(update_dataList({listName:"userTasksList", newList:[]}))
                break

            default:
                return
            
        }
    }

    return{
        finalAction
    }
}