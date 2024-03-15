import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";

export default function useHeaderTask(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation)
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const {localStorage_renameFolder, localStorage_deleteFolder} = useLocalStorage()

    const dispatch = useDispatch()

    const addTask = () => {
        dispatch(update_taskOnCreation(!taskOnCreation))
    }

    const deleteFolder = () => {
        const userValidDelete = window.confirm(`Are you sure, delete ${folderSelectedName} ?`)
        if(userValidDelete){
            localStorage_deleteFolder()
        }
    }

    const handleChange = (e) => { localStorage_renameFolder(e.target.value) }

    return{
        addTask,
        deleteFolder,
        folderSelectedName,
        handleChange
    }
}