import {useRef} from "react";
import { useSelector } from "react-redux";

export default function useTask_List(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation) // Est-ce qu'une task est en train d'etre créé
    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const displayTaskListRef = useRef()


    const atLeastOneTask = userTasksList.some(task => task.folderID === folderSelectedID)

    return{
        userTasksList,
        taskOnCreation,
        displayTaskListRef,
        atLeastOneTask,
        folderSelectedID
    }
}