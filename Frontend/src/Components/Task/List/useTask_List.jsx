import {useRef} from "react";
import { useSelector } from "react-redux";

export default function useTask_List(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation) // Est-ce qu'une task est en train d'etre créé
    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const taskToShow = userTasksList.filter(task => task?.folderID === folderSelectedID)
    const displayTaskListRef = useRef()


    return{
        taskOnCreation,
        displayTaskListRef,
        taskToShow
    }
}