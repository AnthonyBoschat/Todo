import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice";
import { update_closeConnection, update_connected, update_connectedUser } from "../Components/Connection/ConnectionSlice";
import { update_loadAllDatas, update_allDatasLoad, update_dataList, update_addData, update_deleteData, update_changeData, update_DELETE_ALL_DATAS } from "../Components/User/UserSlice";
import useSideEffect from "./useSideEffect";
import useDictionnary from "./useDictionnary";
import { update_taskOnCreation } from "../Components/Task/TaskSlice";

export default function useFinalAction(){

    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const dispatch = useDispatch()
    const {startSideEffect} = useSideEffect()
    const {dataListDictionary} = useDictionnary()

    const finalAction = (payload) => {
        let dataIndex

        switch(payload.finalAction){
            // // Pour connecter un utilisateur
            // case "connectUser":
            //     dispatch(update_connected(true))
            //     dispatch(update_connectedUser({
            //         name:payload.data.userName,
            //         _id:payload.data._id
            //     }))
            //     break
                
            // // Pour déconnecter un utilisateur
            // case "disconnectUser":
            //     dispatch(update_dataList({listName:"userFoldersList", newList:[]}))
            //     dispatch(update_dataList({listName:"userTasksList", newList:[]}))
            //     dispatch(update_folderSelectedID(null))
            //     dispatch(update_allDatasLoad(false))
            //     dispatch(update_closeConnection())
            //     break

            // // Récupère toutes les données de l'utilisateur
            // case "loadAllDatas":
            //     const {newUserFoldersList, newUserTasksList} = payload.data
            //     dispatch(update_loadAllDatas({newUserFoldersList, newUserTasksList}))
            //     dispatch(update_allDatasLoad(true))
            //     break

            // // Ajoute une donnée
            // case "createData":
            //     dispatch(update_addData({listName:payload.target, newData:payload.data}))
            //     if(payload.sideEffect){
            //         startSideEffect(payload.sideEffect, payload.data)
            //     }
            //     break

                
            // // Modifie une ou plusieurs données
            // case "changeData":
            //     if(Array.isArray(payload.data)){
            //         payload.data.forEach(data => {
            //             dataIndex = dataListDictionary[payload.target].findIndex(item => item._id === data._id)
            //             dispatch(update_changeData({listName:payload.target, dataIndex:dataIndex, newData:data}))
            //         })
            //     }else{
            //         dataIndex = dataListDictionary[payload.target].findIndex(item => item._id === payload.data._id)
            //         dispatch(update_changeData({listName:payload.target, dataIndex:dataIndex, newData:payload.data}))
            //     }
            //     if(payload.sideEffect){
            //         startSideEffect(payload.sideEffect, payload.data[0])
            //     }
            //     break

                
            // // Supprime une donnée
            // case "deleteData":
            //     dataIndex = dataListDictionary[payload.target].findIndex(item => item._id === payload.data._id)
            //     dispatch(update_deleteData({listName:payload.target, dataIndex:dataIndex}))

            //     if(payload.sideEffect){
            //         startSideEffect(payload.sideEffect, payload.data)
            //     }
            //     break


























            // USER
            case "user/connect":
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.data.userName,
                    _id:payload.data._id
                }))
                break
            
            case "user/disconnect":
                dispatch(update_dataList({listName:"userFoldersList", newList:[]}))
                dispatch(update_dataList({listName:"userTasksList", newList:[]}))
                dispatch(update_folderSelectedID(null))
                dispatch(update_allDatasLoad(false))
                dispatch(update_closeConnection())
                break

            case "user/loadDatas":
                const {newUserFoldersList, newUserTasksList} = payload.data
                dispatch(update_loadAllDatas({newUserFoldersList, newUserTasksList}))
                dispatch(update_allDatasLoad(true))
                break


                



            // FOLDER
            case "folder/create":
                dispatch(update_addData({listName:"userFoldersList", newData:payload.data}))
                dispatch(update_folderSelectedID(payload.data._id))
                break


            case "folder/delete":
                dataIndex = userFoldersList.findIndex(folder => folder._id === payload.data._id)
                dispatch(update_deleteData({listName:"userFoldersList", dataIndex:dataIndex}))
                dispatch(update_folderSelectedID(null))
                break

            case "folder/update":
                dataIndex = userFoldersList.findIndex(folder => folder._id === payload.data._id)
                dispatch(update_changeData({listName:"userFoldersList", dataIndex:dataIndex, newData:payload.data}))
                break





            // TASK
            case "task/create":
                dispatch(update_addData({listName:"userTasksList", newData:payload.data}))
                dispatch(update_taskOnCreation(false))
                break


            case "task/delete":
                dataIndex = userTasksList.findIndex(folder => folder._id === payload.data._id)
                dispatch(update_deleteData({listName:"userTasksList", dataIndex:dataIndex}))
                break

            case "task/update":
                if(Array.isArray(payload.data)){
                    payload.data.forEach(data => {
                        dataIndex = userTasksList.findIndex(task => task._id === data._id)
                        dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
                    })
                }else{
                    dataIndex = userTasksList.findIndex(folder => folder._id === payload.data._id)
                    dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:payload.data}))
                }
                break






            // DEVTOOL
            case "DEVTOOL/DELETE_ALL_FOLDERS":
                dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
                break

            case "DEVTOOL/DELETE_ALL_TASKS":
                dispatch(update_dataList({listName:"userTasksList", newList:payload.data}))
                break

            default:
                return
            
        }
    }

    return{
        finalAction
    }
}