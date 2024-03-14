import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";

export default function useTask_Creation(){

    const foldersList = useSelector(store => store.localStorage.todoStorage.foldersList) // La liste des dossiers
    const taskOnCreation = useSelector(store => store.task.taskOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderIndex = foldersList.findIndex(folder => folder.id === folderSelectedID) // L'index du dossier selectionner dans la liste des dossiers 
    
    
    const dispatch = useDispatch()

    const taskCreationDisplayRef = useRef()
    const taskCreationRef = useRef()


    const generateTaskID = () => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        let newID
        if(todoStorage.foldersList[folderIndex].taskList.length === 0){
            newID = 0
        }else{
            const taskList = todoStorage.foldersList[folderIndex].taskList
            const maximumID = taskList.reduce((max, task) => task.id > max ? task.id : max, taskList[0].id)
            newID = maximumID + 1
        }
        return newID
    }

    // Annule la création de la task
    const handleClickOutside = useCallback((event) => {
        // if(event.target !== taskCreationDisplayRef.current){
        //     if(event.target !== taskCreationRef.current){
        //         dispatch(update_taskOnCreation(false))
        //     }
        // }
        const taskTitle = taskCreationRef.current.innerHTML
        const taskID = generateTaskID()
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        todoStorage.foldersList[folderIndex].taskList.push({title:taskTitle, id:taskID, finish:false})
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        dispatch(update_todoStorage(todoStorage))
        dispatch(update_taskOnCreation(false))
    }, [taskOnCreation])



    // Valide la création de la task
    const handleValidTask = useCallback((event) => {
        if(event.key === "Enter"){
            if(event.shiftKey){
                return
            }else{
                const taskTitle = taskCreationRef.current.innerHTML
                const taskID = generateTaskID()
                const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
                todoStorage.foldersList[folderIndex].taskList.push({title:taskTitle, id:taskID, finish:false})
                localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
                dispatch(update_todoStorage(todoStorage))
                dispatch(update_taskOnCreation(false))
            }
        }
    }, [taskOnCreation])

    // Quand une nouvelle task souhaite etre créé, on met le focus dessus
    useEffect(() => { 
        if(taskOnCreation && taskCreationRef.current){
            taskCreationRef.current.focus()
        }
    }, [taskOnCreation])

    // Gestion des deux listener, sur le clique outside et le keypressEnter pour la validation ou l'annulation de la task
    useEffect(() => { 
        if(taskCreationRef.current && taskOnCreation){

            taskCreationRef.current.addEventListener("keydown", handleValidTask)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);

            return () => {
                window.removeEventListener("click", handleClickOutside)
                if(taskCreationRef.current){
                    taskCreationRef.current.removeEventListener("keydown", handleValidTask)
                }
            }
        }
    }, [taskOnCreation])

    return{
        taskCreationDisplayRef,
        taskCreationRef,
        generateTaskID
    }
}