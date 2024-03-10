import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";

export default function useTask_List(){

    const foldersList = useSelector(store => store.localStorage.todoStorage.foldersList) // La liste des dossiers
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID) // L'id du dossier selectionner
    const taskOnCreation = useSelector(store => store.task.taskOnCreation) // Est-ce qu'une task est en train d'etre créé

    const dispatch = useDispatch()
    const taskCreationDisplayRef = useRef()
    const taskCreationRef = useRef()
    const displayTaskListRef = useRef()

    const folderIndex = foldersList.findIndex(folder => folder.id === folderSelectedID) // L'index du dossier selectionner dans la liste des dossiers 
    const taskList = foldersList[folderIndex]?.taskList // Le dossier correspondant dans la liste des dossier au dossier selectionner
    


    // Supprime la task
    const deleteTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const newTaskList = todoStorage.foldersList[folderIndex].taskList.filter(task => task.id !== taskID)
        todoStorage.foldersList[folderIndex].taskList = newTaskList
        dispatch(update_todoStorage(todoStorage))
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
    }
    return{
        taskList,
        deleteTask,
        taskCreationRef,
        taskOnCreation,
        displayTaskListRef,
        taskCreationDisplayRef
    }
}