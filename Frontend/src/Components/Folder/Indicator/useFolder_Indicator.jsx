import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import usePopup from "../../Popup/usePopup";
import useFolder_Request from "../FolderAction";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useFolder_Indicator(){

    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderInputRef = useRef()
    const {popup} = usePopup()
    const {fetchRequest} = useFetchRequest()

    // Responsable de si oui ou non, on laisse l'input folderName etre accessible
    const [folderInputDisabled, setFolderInputDisabled] = useState(true)
    const [folderName, setFolderName] = useState(null)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Permet de rendre l'inputFolderName Accessible ou non
    const lockUnlockFolder = () => {
        setFolderInputDisabled(!folderInputDisabled)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Signale qu'on souhaite supprimer ce dossier
    const deleteFolder = () => {
        const userValidDelete = window.confirm(`Are you sure, delete ${folderSelectedName} ?`)
        if(userValidDelete){
            fetchRequest("DELETE", `folder/delete/${folderSelectedID}`)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Quand on modifie le nom du dossier
    const handleChangeInputFolder = (e) => {
        setFolderName(e.target.value)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Permet de mettre le focus sur l'input
    const focusInputFolder = (folderRef) => {
        folderRef.selectionStart = folderRef.value.length
        folderRef.selectionEnd = folderRef.value.length
        folderRef.focus()
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Controle pour verifier que le nom du dossier n'est pas vide
    const controlFolderNameNotEmpty = (folderName) => {
        return /\S/.test(folderName)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Reponsable du premier chargement du nom du dossier dans l'input
    useEffect(() => {
        if(folderSelectedName){
            setFolderName(folderSelectedName)
        }
    }, [folderSelectedName])



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
                        fetchRequest(newFolderName, folderSelectedID)
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
                        fetchRequest("PUT", `folder/rename/${folderSelectedID}`, {newFolderName})
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
        folderInputRef,
        folderInputDisabled,
        folderSelectedName,
        folderName,
        handleChangeInputFolder,
        lockUnlockFolder,
        deleteFolder
    }
}