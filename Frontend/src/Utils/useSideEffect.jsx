import React, {} from "react";
import { useDispatch } from "react-redux"
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice"

export default function useSideEffect(){


    const dispatch = useDispatch()

    const library_sideEffect = {
        createFolder:(data) => {dispatch(update_folderSelectedID(data._id))},
        deleteFolder:() => {dispatch(update_folderSelectedID(null))},
        changeFolderName:(data) => {dispatch(update_folderSelectedName(data.name))}
    }


    const startSideEffect = (sideEffect, data = null) => {
        library_sideEffect[sideEffect](data)
    }


    return{
        startSideEffect
    }
}