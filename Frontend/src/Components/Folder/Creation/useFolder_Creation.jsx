import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useFolder_Request from "../FolderRequest";

export default function useFolder_Creation(){

    const inputRef = useRef()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const {folderRequest_Create} = useFolder_Request()

    // Check la validité du dossier qui souhaite etre enregistrer
    const saveNewFolder = () => {
        if(inputRef.current.value !== ""){ // S'il n'a pas un nom vide
            const newFolderName = inputRef.current.value
            folderRequest_Create({name:newFolderName}) // On l'enregistre dans la base de donnée
        }
    }

    // Appuie sur la touche entrée
    const handleValidFolder = useCallback((event) => { if(event.key === "Enter" && inputRef.current){saveNewFolder()} }, [folderOnCreation])
    // Si l'utilisateur clique ailleurs
    const handleClickOutside = useCallback(() => { if(inputRef.current){saveNewFolder()} }, [folderOnCreation])
    
    // Quand folderOnCreation passe en true ( qu'on est en train de créé un dossier )
    useEffect(() => {
        if(inputRef.current && folderOnCreation){
            inputRef.current.addEventListener("keydown", handleValidFolder)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);
            
            return () => window.removeEventListener("click", handleClickOutside)
        }
    }, [folderOnCreation])


    return{
        inputRef
    }
}