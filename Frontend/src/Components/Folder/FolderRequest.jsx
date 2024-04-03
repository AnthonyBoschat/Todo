import React, {} from "react";
import useBackend from "../../Utils/useBackend";
import { useDispatch } from "react-redux";
import { update_folderOnCreation, update_folderSelectedID, update_folderSelectedName } from "./FolderSlice";
import { update_addData, update_changeData, update_deleteData } from "../User/UserSlice";
import { useSelector } from "react-redux";

export default function useFolder_Request(){

    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const dispatch = useDispatch()
    const {fetchRequest} = useBackend()

    const folderRequest_Create = async (newFolder) => {
        try{
            const {ok, data} = await fetchRequest("POST", {
                route: "/folder/create",
                body: newFolder
            })
            if(ok){
                dispatch(update_addData({listName: "userFoldersList", newData:data}))
                dispatch(update_folderSelectedID(data._id))
                dispatch(update_folderSelectedName(data.name))
                dispatch(update_folderOnCreation(false))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la création du dossier:", error)
        }
    }

    const folderRequest_Delete = async(folderSelectedID) => {
        try{
            const {ok, data} = await fetchRequest("DELETE", {
                route: `/folder/delete/${folderSelectedID}`
            })
            if(ok){
                const dataIndex = userFoldersList.findIndex(folder => folder._id === data._id)
                dispatch(update_deleteData({listName:"userFoldersList", dataIndex:dataIndex}))
                dispatch(update_folderSelectedID(null))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la suppression du dossier:", error)
        }
    }

    const folderRequest_Rename = async(newFolderName, folderSelectedID) => {
        try{
            const {ok, data} = await fetchRequest("PUT", {
                route: `/folder/rename/${folderSelectedID}`,
                body:{newFolderName}
            })
            if(ok){
                console.log("good => folderRequest")
                const dataIndex = userFoldersList.findIndex(folder => folder._id === data._id)
                dispatch(update_changeData({listName:"userFoldersList", dataIndex:dataIndex, newData:data}))
                dispatch(update_folderSelectedName(data.name))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors du renommage du dossier:", error)
        }
    }

    return{
        folderRequest_Create,
        folderRequest_Delete,
        folderRequest_Rename
    }
}