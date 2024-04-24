import React from "react";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function Item_Delete({itemID}){

    const {fetchRequest} = useFetchRequest()

    const deleteItem = () => {
        const confirm = window.confirm("Delete this item ?")
        if(confirm){
            fetchRequest("DELETE", `item/delete/${itemID}`)
        }
    }

    return(
        <>
            <i onClick={deleteItem} style={{fontSize:"1.6rem"}} className="fa-solid fa-trash active"></i>
        </>
    )
}