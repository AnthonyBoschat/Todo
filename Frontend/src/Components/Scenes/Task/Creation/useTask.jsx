import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";

export default function useTask_Creation(){

    const todoStorage = useSelector(store => store.localStorage.todoStorage) // La liste des dossiers
    const taskOnCreation = useSelector(store => store.task.taskOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    
    const {localStorage_saveNewTask} = useLocalStorage()
    const dispatch = useDispatch()
    const taskCreationRef = useRef()


    // Prépare la sauvegarde dans le localStorage de la nouvelle tâche
    const saveNewTask = () => {
        const taskTitle = taskCreationRef.current.innerText
        const newTask = {content:taskTitle, completed:false}
        localStorage_saveNewTask(newTask)
    }

    // Validation de la task par le click en dehors, si le nom est rempli au moin
    const handleValidTaskKeydownClick = useCallback(() => {
        if(taskCreationRef.current.innerHTML !== ""){
            saveNewTask()
        }
        dispatch(update_taskOnCreation(false))
    }, [taskOnCreation])


    // Validation de la task par le click en dehors, si le nom est rempli au moin
    const handleValidTaskKeydown = useCallback((event) => {
        if(event.key === "Enter"){
            if(!event.shiftKey){
                saveNewTask()
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

            taskCreationRef.current.addEventListener("keydown", handleValidTaskKeydown)
            setTimeout(() => {window.addEventListener("click", handleValidTaskKeydownClick)}, 1);

            return () => {
                window.removeEventListener("click", handleValidTaskKeydownClick)
                if(taskCreationRef.current){
                    taskCreationRef.current.removeEventListener("keydown", handleValidTaskKeydown)
                }
            }
        }
    }, [taskOnCreation])

    return{
        taskCreationRef,
    }
}