import React, { useEffect } from "react";
import useList_Creation from "./useList_Creation";

export default function List_Creation(){

    const {
        listOnCreationRef
    } = useList_Creation()

    

    return(
        <div ref={listOnCreationRef} contentEditable autoFocus className="list_onCreation"></div>
    )
}