import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";

export default function useTask_List(){

    const foldersList = useSelector(store => store.localStorage.todoStorage.foldersList) // La liste des dossiers
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID) // L'id du dossier selectionner
    const taskOnCreation = useSelector(store => store.task.taskOnCreation) // Est-ce qu'une task est en train d'etre créé
    const displayTaskListRef = useRef()
    const folderIndex = foldersList.findIndex(folder => folder.id === folderSelectedID) // L'index du dossier selectionner dans la liste des dossiers 
    const taskList = foldersList[folderIndex]?.taskList // Le dossier correspondant dans la liste des dossier au dossier selectionner


    return{
        taskList,
        taskOnCreation,
        displayTaskListRef,
        folderIndex
    }
}