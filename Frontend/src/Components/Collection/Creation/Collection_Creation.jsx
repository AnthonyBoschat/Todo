import React, { useEffect } from "react";
import useCollection_Creation from "./useCollection_Creation";

export default function List_Creation(){

    const {
        collectionOnCreationRef
    } = useCollection_Creation()

    

    return(
        <div ref={collectionOnCreationRef} contentEditable autoFocus className="list_onCreation"></div>
    )
}