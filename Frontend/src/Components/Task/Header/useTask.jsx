import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import useMongoDB from "../../../Utils/useMongoDB";
import { useEffect, useRef, useState } from "react";
import usePopup from "../../Popup/usePopup";

export default function useHeaderTask(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const {mongoDB_renameFolder, mongoDB_deleteFolder} = useMongoDB()
    const {popup} = usePopup()

    const dispatch = useDispatch()
    const folderInputRef = useRef()

    // Responsable de si oui ou non, on laisse l'input folderName etre accessible
    const [folderInputDisabled, setFolderInputDisabled] = useState(true)
    const [folderName, setFolderName] = useState(null)
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Reponsable du premier chargement du nom du dossier dans l'input
    useEffect(() => {
        if(folderSelectedName){
            setFolderName(folderSelectedName)
        }
    }, [folderSelectedName])


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FONCTION
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Signale qu'on souhaite ajouter une tâche
    const addTask = () => {
        dispatch(update_taskOnCreation(!taskOnCreation))
    }

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Signale qu'on souhaite supprimer ce dossier
    const deleteFolder = () => {
        const userValidDelete = window.confirm(`Are you sure, delete ${folderSelectedName} ?`)
        if(userValidDelete){
            mongoDB_deleteFolder(folderSelectedID)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Permet de rendre l'inputFolderName Accessible ou non
    const lockUnlockFolder = () => {
        setFolderInputDisabled(!folderInputDisabled)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Controle pour verifier que le nom du dossier n'est pas vide
    const controlFolderNameNotEmpty = (folderName) => {
        return /\S/.test(folderName)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Permet de mettre le focus sur l'input
    const focusInputFolder = (folderRef) => {
        folderRef.selectionStart = folderRef.value.length
        folderRef.selectionEnd = folderRef.value.length
        folderRef.focus()
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Quand on modifie le nom du dossier
    const handleChangeInputFolder = (e) => {
        setFolderName(e.target.value)
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // USE EFFECT
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Gère les listener de validation de changement de nom de l'input folderName pour le repasser en lock, et la sauvegarde
    useEffect(() => {
        if(!folderInputDisabled && folderInputRef.current){

            focusInputFolder(folderInputRef.current) // On focus l'input

            const handleClickOutside = (e) => {
                if(e.target !== folderInputRef.current){
                    if(!controlFolderNameNotEmpty(folderInputRef.current.value)){
                        popup({
                            message:"The name of your folder cannot be empty.",
                            color:"bad",
                            hidden:false
                        })
                        setFolderName(folderSelectedName)
                        setFolderInputDisabled(true)
                    }else{
                        const newFolderName = folderInputRef.current.value
                        mongoDB_renameFolder(newFolderName, folderSelectedID)
                        setFolderInputDisabled(true)
                    }
                }
            }
            const handleKeyDown = (e) => {
                if(e.key === "Enter"){
                    if(!controlFolderNameNotEmpty(folderInputRef.current.value)){
                        popup({
                            message:"The name of your folder cannot be empty.",
                            color:"bad",
                            hidden:false
                        })
                        setFolderName(folderSelectedName)
                        setFolderInputDisabled(true)
                    }else{
                        const newFolderName = folderInputRef.current.value
                        mongoDB_renameFolder(newFolderName, folderSelectedID)
                        setFolderInputDisabled(true)
                    }
                }
            }

            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);
            folderInputRef.current.addEventListener("keydown", handleKeyDown)

            return () => {
                window.removeEventListener("click", handleClickOutside)
                folderInputRef.current.removeEventListener("keydown", handleKeyDown)
            }
        } 
    }, [folderInputDisabled])

    return{
        addTask,
        deleteFolder,
        folderSelectedName,
        folderInputRef,
        folderInputDisabled,
        lockUnlockFolder,
        folderName,
        handleChangeInputFolder
    }
}