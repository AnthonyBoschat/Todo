import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {update_listOnCreation} from "../ListSlice"
import useFetchRequest from "../../../Utils/useFetchRequest"

export default function useList_Creation(){

    const listOnCreation = useSelector(store => store.list.listOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const listOnCreationRef = useRef()
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    useEffect(() => { 
        if(listOnCreation && listOnCreationRef.current){
            listOnCreationRef.current.focus()
        }
    }, [listOnCreation])

    const handleClickOutside = (event) => {
        if(event.target === listOnCreationRef.current){
            event.preventDefault()
            return
        }
        if(listOnCreationRef.current.innerText !== ""){
            const newList = {
                name:listOnCreationRef.current.innerText,
                folderID:folderSelectedID,
            }
            fetchRequest("POST", "list/create", newList)
            return
        }else{
            dispatch(update_listOnCreation(false))
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            if(!event.shiftKey){
                if(listOnCreationRef.current.innerText !== ""){
                    event.preventDefault()
                    const newList = {
                        name:listOnCreationRef.current.innerText,
                        folderID:folderSelectedID,
                    }
                    fetchRequest("POST", "list/create", newList)
                    return
                }else{
                    dispatch(update_listOnCreation(false))
                }
            }
        }
    }

    useEffect(() => {
        if(listOnCreationRef.current && listOnCreation){
            listOnCreationRef.current.addEventListener("keydown", handleKeyDown)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);

            return () => {window.removeEventListener("click", handleClickOutside)}
        }
    }, [listOnCreationRef])

    return{
        listOnCreationRef,
    }
}