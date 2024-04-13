import React from "react";
import useList_List from "./useList_List";
import List_Creation from "../Creation/List_Creation";
import List_One from "../One/List_One";

export default function List_List(){

    const {
        listOnCreation,
        listToShow
    } = useList_List()

    

    return(
        <div className="List_List_Display">
            <div className="List_List_Box">

                {listToShow.length > 0 && (listToShow.map((list, index) => (
                    <List_One key={index} list={list}/>
                )))}

                {listOnCreation && (<List_Creation/>)}


            </div>
        </div>
    )
}