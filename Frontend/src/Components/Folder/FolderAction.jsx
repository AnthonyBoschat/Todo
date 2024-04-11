import React, {} from "react";
import useFetchRequest from "../../Utils/useFetchRequest";
import { useDispatch } from "react-redux";
import { update_folderOnCreation, update_folderSelectedID, update_folderSelectedName } from "./FolderSlice";
import { update_addData, update_changeData, update_deleteData } from "../User/UserSlice";
import { useSelector } from "react-redux";

export default function useFolder_Request(){

    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const dispatch = useDispatch()
    // const {fetchRequest} = useFetchRequest()


    const folderAction = {
        create:(data) => {
            dispatch(update_addData({listName: "userFoldersList", newData:data}))
            dispatch(update_folderSelectedID(data._id))
            dispatch(update_folderSelectedName(data.name))
            dispatch(update_folderOnCreation(false))
        },

        delete:(data) => {
            const dataIndex = userFoldersList.findIndex(folder => folder._id === data._id)
            dispatch(update_deleteData({listName:"userFoldersList", dataIndex:dataIndex}))
            dispatch(update_folderSelectedID(null))
        },

        rename:(data) => {
            const dataIndex = userFoldersList.findIndex(folder => folder._id === data._id)
            dispatch(update_changeData({listName:"userFoldersList", dataIndex:dataIndex, newData:data}))
            dispatch(update_folderSelectedName(data.name))
        },

        sort:() => {
            console.log("Requette de réorganisation des dossiers effectuer")
        }
    }

    return{
        folderAction
    }
}