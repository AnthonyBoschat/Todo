import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_closeConnection, update_codeValide, update_connected, update_connectedUser, update_emailSend, update_updateSignSelected, update_userWantRecover } from "../Connection/ConnectionSlice";
import { update_allDatasLoad, update_dataList, update_loadAllDatas } from "./UserSlice";
import { update_folderSelectedID } from "../Folder/FolderSlice";

export default function useUser_Request(){

    const dispatch = useDispatch()

    const userAction = {

        create:(data) => {
            dispatch(update_connected(true))
            dispatch(update_connectedUser({
                name:data.userName,
                _id:data._id
            }))
        },

        connect:(data) => {
            dispatch(update_connected(true))
            dispatch(update_connectedUser({
                name:data.userName,
                _id:data._id
            }))
        },

        reconnect:(data) => {
            dispatch(update_connected(true))
            dispatch(update_connectedUser({
                name:data.userName,
                _id:data._id
            }))
        },

        disconnect:() => {
            dispatch(update_dataList({listName:"userFoldersList", newList:[]}))
            dispatch(update_dataList({listName:"userItemsList", newList:[]}))
            dispatch(update_folderSelectedID(null))
            dispatch(update_allDatasLoad(false))
            dispatch(update_closeConnection())
            dispatch(update_updateSignSelected("signin"))
        },

        checkResetPasswordCode:() => {
            dispatch(update_codeValide(true))
            dispatch(update_emailSend(false))
        },

        sendRecoverPasswordEmail:() => {
            dispatch(update_emailSend(true))
        },

        changePassword:() => {
            dispatch(update_userWantRecover(false))
            dispatch(update_codeValide(false))
            dispatch(update_emailSend(false))
        },

        loadDatas:(data) => {
            const {newUserFoldersList, newUserItemsList, newUserListsList, newUserPropertiesList} = data
            newUserFoldersList.sort((a,b) => a.position - b.position)
            newUserItemsList.sort((a,b) => a.position - b.position)
            newUserListsList.sort((a,b) => a.position - b.position)

            dispatch(update_loadAllDatas({newUserFoldersList, newUserItemsList, newUserListsList, newUserPropertiesList}))
            dispatch(update_allDatasLoad(true))
        }
    }

    return{
        userAction
    }
}