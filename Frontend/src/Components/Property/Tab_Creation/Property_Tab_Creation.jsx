import React, { useEffect, useRef } from "react";
import useFetchRequest from "../../../Utils/useFetchRequest";
import { useSelector } from "react-redux";


export default function Property_Tab_Creation(){

    const newPropertyRef = useRef()
    const {fetchRequest} = useFetchRequest()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    useEffect(() => {
        if(newPropertyRef.current){
            newPropertyRef.current.focus()
            newPropertyRef.current.addEventListener("keydown", (e) => {
                if(e.key === "Enter"){
                    if(!e.shiftKey){
                        e.preventDefault()
                        fetchRequest("POST", "property/create", {
                            propertyName:newPropertyRef.current.innerText,
                            folderID:folderSelectedID
                        })
                    }
                }
            })
        }
    }, [newPropertyRef])

    return(
        <span ref={newPropertyRef} contentEditable autoFocus className="oneProperty oneProperty_Creation"></span>
    )
}