import React, { useEffect, useRef, useState } from "react";
import useList_Folder from "./useFolder";
import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_folderOnCreation } from "./FolderSlice";

export default function List_Folder(){

    const folders = useSelector(store => store.folder.list)
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const inputRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        if(inputRef.current && folderOnCreation){
            const handleSubmit = (event) => {
                if(event.key === "Enter"){
                    const newFolderName = event.srcElement.value
                    dispatch(update_addFolder({name:newFolderName}))
                    dispatch(update_folderOnCreation(false))
                }
            }

            const handleClick = (event) => {
                console.log("Annulation de la création du dossier")
                if(inputRef.current){
                    if(inputRef.current.value != ""){
                        const newFolderName = inputRef.current.value
                        dispatch(update_addFolder({name:newFolderName}))
                    }
                    dispatch(update_folderOnCreation(false))
                }
            }

            inputRef.current.addEventListener("keydown", handleSubmit)
            setTimeout(() => {window.addEventListener("click", handleClick)}, 1);
            
            return () => window.removeEventListener("click", handleClick)
        }
    }, [folderOnCreation])
    return(
        <div className="listFolder_Display">
            <ul className="listFolder_Box">
                {folders.map((folder, index) => (
                    <li key={`folder_${index}`}>
                        <button>{folder.name}</button>
                    </li>
                ))}
                {folderOnCreation && (
                    <li className="folderOnCreation_Box">
                        <input ref={inputRef} autoFocus type="text"/>
                    </li>
                )}
            </ul>
        </div>
    )
}