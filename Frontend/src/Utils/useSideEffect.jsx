import { useDispatch } from "react-redux"
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice"
import { update_taskOnCreation } from "../Components/Task/TaskSlice";

export default function useSideEffect(){


    const dispatch = useDispatch()

    const library_sideEffect = {
        createFolder:(data) => {dispatch(update_folderSelectedID(data._id))},
        createTask:() => {dispatch(update_taskOnCreation(false))},
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