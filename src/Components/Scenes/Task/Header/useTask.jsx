import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";
import { useEffect, useRef, useState } from "react";

export default function useHeaderTask(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation)
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const {localStorage_renameFolder, localStorage_deleteFolder} = useLocalStorage()

    const dispatch = useDispatch()
    const folderInputRef = useRef()

    // Responsable de si oui ou non, on laisse l'input folderName etre accessible
    const [folderInputDisabled, setFolderInputDisabled] = useState(true)
    // Responsable de la mémorisation du folderName avant modification
    const [folderNameMemory, setFolderNameMemory] = useState(null)

    // Signale qu'on souhaite ajouter une tâche
    const addTask = () => {
        dispatch(update_taskOnCreation(!taskOnCreation))
    }

    // Signale qu'on souhaite supprimer ce dossier
    const deleteFolder = () => {
        const userValidDelete = window.confirm(`Are you sure, delete ${folderSelectedName} ?`)
        if(userValidDelete){
            localStorage_deleteFolder()
        }
    }

    // Quand la valeur dans l'input change
    const handleChange = (e) => { localStorage_renameFolder(e.target.value) }

    // Permet de rendre l'inputFolderName Accessible ou non
    const lockUnlockFolder = () => {
        setFolderInputDisabled(!folderInputDisabled)
        setFolderNameMemory(folderSelectedName)
    }

    // Controle pour verifier que le nom du dossier n'est pas vide
    const controlFolderNameNotEmpty = (folderName) => {
        return /\S/.test(folderName)
    }

    // Permet de mettre le focus sur l'input
    const focusInputFolder = (folderRef) => {
        folderRef.selectionStart = folderRef.value.length
        folderRef.selectionEnd = folderRef.value.length
        folderRef.focus()
    }



    // Gère les listener de validation de changement de nom de l'input folderName pour le repasser en lock
    useEffect(() => {
        if(!folderInputDisabled && folderInputRef.current){

            focusInputFolder(folderInputRef.current) // On focus l'input

            const handleClickOutside = (e) => {
                if(e.target !== folderInputRef.current){
                    if(!controlFolderNameNotEmpty(folderInputRef.current.value)){
                        window.alert("The name of your folder cannot be empty.")
                        localStorage_renameFolder(folderNameMemory)
                    }else{
                        setFolderInputDisabled(true)
                    }
                    
                }
            }
            const handleKeyDown = (e) => {
                if(e.key === "Enter"){
                    if(!controlFolderNameNotEmpty(folderInputRef.current.value)){
                        window.alert("The name of your folder cannot be empty.")
                        localStorage_renameFolder(folderNameMemory)
                    }else{
                        setFolderInputDisabled(true)
                    }
                }
            }

            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);
            folderInputRef.current.addEventListener("keydown", handleKeyDown)

            return () => window.removeEventListener("click", handleClickOutside)
        } 
    }, [folderInputDisabled])

    return{
        addTask,
        deleteFolder,
        folderSelectedName,
        handleChange,
        folderInputRef,
        folderInputDisabled,
        lockUnlockFolder
    }
}