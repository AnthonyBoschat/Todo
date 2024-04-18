import React from "react";
import List_Add from "../../Components/List/Add/List_Add"
import List_List from "../../Components/List/List/List_List";

export default function Lists(){

    return(
        <div className="Lists_Display">
            <div className="Lists_Box">
                <List_Add/>
                <List_List/>
            </div>
        </div>
    )
}