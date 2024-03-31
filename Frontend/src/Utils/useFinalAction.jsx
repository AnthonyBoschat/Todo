import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice";
import { update_closeConnection, update_connected, update_connectedUser } from "../Components/Connection/ConnectionSlice";
import { update_loadAllDatas, update_allDatasLoad, update_dataList, update_addData, update_deleteData, update_changeData, update_DELETE_ALL_DATAS } from "../Components/User/UserSlice";
import useSideEffect from "./useSideEffect";
import useDictionnary from "./useDictionnary";

export default function useFinalAction(){

    const dispatch = useDispatch()
    const {startSideEffect} = useSideEffect()
    const {dataListDictionary} = useDictionnary()

    const finalAction = (payload) => {
        let dataIndex
        switch(payload.finalAction){
            // Pour connecter un utilisateur
            case "connectUser":
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.data.userName,
                    _id:payload.data._id
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

            // Récupère toutes les données de l'utilisateur
            case "loadAllDatas":
                const {userFoldersList, userTasksList} = payload.data
                dispatch(update_loadAllDatas({userFoldersList, userTasksList}))
                dispatch(update_allDatasLoad(true))
                break

            // Ajoute une donnée
            case "createData":
                dispatch(update_addData({listName:payload.target, newData:payload.data}))
                if(payload.sideEffect){
                    startSideEffect(payload.sideEffect, payload.data)
                }
                break

            // Supprime une donnée
            case "deleteData":
                dataIndex = dataListDictionary[payload.target].findIndex(item => item._id === payload.data._id)
                dispatch(update_deleteData({listName:payload.target, dataIndex:dataIndex}))
                if(payload.sideEffect){
                    startSideEffect(payload.sideEffect, payload.data)
                }
                break

            // Modifie une ou plusieurs données
            case "changeData":
                if(Array.isArray(payload.data)){
                    payload.data.forEach(data => {
                        dataIndex = dataListDictionary[payload.target].findIndex(item => item._id === data._id)
                        dispatch(update_changeData({listName:payload.target, dataIndex:dataIndex, newData:data}))
                    })
                }else{
                    dataIndex = dataListDictionary[payload.target].findIndex(item => item._id === payload.data._id)
                    dispatch(update_changeData({listName:payload.target, dataIndex:dataIndex, newData:payload.data}))
                }
                if(payload.sideEffect){
                    startSideEffect(payload.sideEffect, payload.data[0])
                }
                break







            // Detruits tout les dossiers
            case "/folder/DELETE_ALL_FOLDERS":
                dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
                break

            // Détuits toutes les tâches
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