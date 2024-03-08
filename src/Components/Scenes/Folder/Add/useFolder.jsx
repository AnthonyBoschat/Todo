import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import {update_folderOnCreation} from "../FolderSlice"

export default function useAddFolder(){

    const dispatch = useDispatch()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)

    const addNewFolder = () => {
        dispatch(update_folderOnCreation(!folderOnCreation))
    }

    return{
        addNewFolder
    }
}