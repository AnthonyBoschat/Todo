import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_closeConnection, update_onDisconnection } from "../Connection/ConnectionSlice";
import { update_allFoldersLoad, update_folderSelectedID, update_loadFoldersList } from "../Folder/FolderSlice";
import { update_loadTasksList } from "../Task/TaskSlice";

export default function useUser(){

    const dispatch = useDispatch()

    const handleClickDisconnection = () => {
        dispatch(update_onDisconnection(true))
        dispatch(update_folderSelectedID(null))
        dispatch(update_loadFoldersList([]))
        dispatch(update_loadTasksList([]))
        dispatch(update_allFoldersLoad(false))
        setTimeout(() => {
            dispatch(update_closeConnection())
        }, 300);
    }

    return{
        handleClickDisconnection
    }
}