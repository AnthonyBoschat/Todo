import React from "react";
import useFetchRequest from "../../../Utils/useFetchRequest"
import { useSelector } from "react-redux";

export default function Property_Tab_One({property}){

    const {fetchRequest} = useFetchRequest()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    const deleteProperty = () => {
        fetchRequest("DELETE", `property/delete/${property._id}/${folderSelectedID}`)
    }

    return(
        <div className="oneProperty">
            <span>{property.name}</span>
            <i onClick={deleteProperty} className="fa-solid fa-xmark"></i>
        </div>
)
}