import React from "react";
import useList_List from "./useList_List";
import List_Creation from "../Creation/List_Creation";

export default function List_List(){

    const {
        listOnCreation,
    } = useList_List()

    

    return(
        <div className="List_List_Display">
            <div className="List_List_Box">


                {listOnCreation && (<List_Creation/>)}


            </div>
        </div>
    )
}