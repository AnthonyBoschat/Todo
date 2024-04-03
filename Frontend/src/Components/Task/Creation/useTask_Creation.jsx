import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTask_Request from "../TaskRequest";

export default function useTask_Creation(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    
    const {taskRequest_Create} = useTask_Request()
    const taskCreationRef = useRef()


    // Prépare la sauvegarde dans le mongoDB de la nouvelle tâche
    const saveNewTask = () => {
        const taskTitle = taskCreationRef.current.innerText
        const newTask = {
            content:taskTitle, 
            completed:false,
            folderID:folderSelectedID
        }
        taskRequest_Create(newTask)
    }

    // Validation de la task par le click en dehors, si le nom est rempli au moin
    const handleValidTaskKeydownClick = useCallback(() => {
        if(taskCreationRef.current.innerHTML !== ""){
            saveNewTask()
        }
    }, [])


    // Validation de la task par le click en dehors, si le nom est rempli au moin
    const handleValidTaskKeydown = useCallback( async(event) => {
        if(event.key === "Enter"){
            if(!event.shiftKey){
                event.preventDefault()
                saveNewTask()
            }
        }
    }, [])

    
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