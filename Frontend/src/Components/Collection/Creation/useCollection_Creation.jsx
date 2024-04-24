import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {update_collectionOnCreation} from "../CollectionSlice"
import useFetchRequest from "../../../Utils/useFetchRequest"

export default function useList_Creation(){

    const collectionOnCreation = useSelector(store => store.collection.collectionOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const collectionOnCreationRef = useRef()
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    useEffect(() => { 
        if(collectionOnCreation && collectionOnCreationRef.current){
            collectionOnCreationRef.current.focus()
        }
    }, [collectionOnCreation])

    const handleClickOutside = (event) => {
        if(event.target === collectionOnCreationRef.current){
            event.preventDefault()
            return
        }
        if(collectionOnCreationRef.current.innerText !== ""){
            const newList = {
                name:collectionOnCreationRef.current.innerText,
                folderID:folderSelectedID,
            }
            fetchRequest("POST", "collection/create", newList)
            return
        }else{
            dispatch(update_collectionOnCreation(false))
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            if(!event.shiftKey){
                if(collectionOnCreationRef.current.innerText !== ""){
                    event.preventDefault()
                    const newList = {
                        name:collectionOnCreationRef.current.innerText,
                        folderID:folderSelectedID,
                    }
                    fetchRequest("POST", "collection/create", newList)
                    return
                }else{
                    dispatch(update_collectionOnCreation(false))
                }
            }
        }
    }

    useEffect(() => {
        if(collectionOnCreationRef.current && collectionOnCreation){
            collectionOnCreationRef.current.addEventListener("keydown", handleKeyDown)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);

            return () => {window.removeEventListener("click", handleClickOutside)}
        }
    }, [collectionOnCreationRef])

    return{
        collectionOnCreationRef,
    }
}