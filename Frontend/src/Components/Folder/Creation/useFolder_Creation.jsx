import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useFolder_Request from "../FolderAction";
import { update_folderOnCreation } from "../FolderSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useFolder_Creation(){

    const folderCreationRef = useRef()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    useEffect(() => { 
        if(folderOnCreation && folderCreationRef.current){
            folderCreationRef.current.focus()
        }
    }, [folderOnCreation])

    // Check la validité du dossier qui souhaite etre enregistrer
    const saveNewFolder = () => {
        if(folderCreationRef.current.innerText !== ""){ // S'il n'a pas un nom vide
            const newFolderName = folderCreationRef.current.innerText
            fetchRequest("POST", "folder/create", {name:newFolderName})
        }
    }

    const autoResize = () => {
        folderCreationRef.current.style.height = folderCreationRef.current.scrollHeight + 'px'; // Ajuster la hauteur
    }

    // Appuie sur la touche entrée
    const handleValidFolder = useCallback((event) => {
        console.log("controle")
         if(event.key === "Enter"){
            event.preventDefault()
             if(folderCreationRef.current.innerText !== ""){
                saveNewFolder()
            }else{
                dispatch(update_folderOnCreation(false))
             }
        }
    }, [folderOnCreation])


    // Si l'utilisateur clique ailleurs
    const handleClickOutside = useCallback(() => { 
        if(folderCreationRef.current.innerText !== ""){
            saveNewFolder()
        }else{
            dispatch(update_folderOnCreation(false))
        }
    }, [folderOnCreation])
    
    // Quand folderOnCreation passe en true ( qu'on est en train de créé un dossier )
    useEffect(() => {
        if(folderCreationRef.current && folderOnCreation){
            folderCreationRef.current.addEventListener("keydown", handleValidFolder)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);
            
            return () => window.removeEventListener("click", handleClickOutside)
        }
    }, [folderOnCreation])


    return{
        autoResize,
        folderCreationRef
    }
}