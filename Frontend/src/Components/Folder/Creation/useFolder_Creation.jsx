import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useFolder_Request from "../FolderRequest";

export default function useFolder_Creation(){

    const textareaRef = useRef()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const {folderRequest_Create} = useFolder_Request()

    // Check la validité du dossier qui souhaite etre enregistrer
    const saveNewFolder = () => {
        if(textareaRef.current.value !== ""){ // S'il n'a pas un nom vide
            const newFolderName = textareaRef.current.value
            folderRequest_Create({name:newFolderName}) // On l'enregistre dans la base de donnée
        }
    }

    const autoResize = () => {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Ajuster la hauteur
    }

    // Appuie sur la touche entrée
    const handleValidFolder = useCallback((event) => {
         if(event.key === "Enter" && textareaRef.current){
            event.preventDefault()
            saveNewFolder()
        }}, [folderOnCreation])
    // Si l'utilisateur clique ailleurs
    const handleClickOutside = useCallback(() => { if(textareaRef.current){saveNewFolder()} }, [folderOnCreation])
    
    // Quand folderOnCreation passe en true ( qu'on est en train de créé un dossier )
    useEffect(() => {
        if(textareaRef.current && folderOnCreation){
            textareaRef.current.addEventListener("keydown", handleValidFolder)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);
            
            return () => window.removeEventListener("click", handleClickOutside)
        }
    }, [folderOnCreation])


    return{
        autoResize,
        textareaRef
    }
}