import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_closeConnection, update_onDisconnection } from "../Connection/ConnectionSlice";
import { update_allFoldersLoad, update_folderSelectedID, update_loadFoldersList } from "../Folder/FolderSlice";
import { update_loadTasksList } from "../Task/TaskSlice";
import usePopup from "../Popup/usePopup"

export default function useUser(){

    const dispatch = useDispatch()
    const {popup} = usePopup()

    const handleClickDisconnection = () => {
        dispatch(update_onDisconnection(true))
        
        
        
        setTimeout(() => {
            dispatch(update_loadFoldersList([]))
            dispatch(update_loadTasksList([]))
            dispatch(update_allFoldersLoad(false))
            dispatch(update_folderSelectedID(null))
            dispatch(update_closeConnection())
            popup({
                message:"You have been disconnected",
                color:"good",
                hidden:false
            })
        }, 350);
    }

    return{
        handleClickDisconnection
    }
}