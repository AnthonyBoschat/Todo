import React from "react";
import Collection_Add from "../../Components/Collection/Add/Collection_Add"
import Collection_List from "../../Components/Collection/List/Collection_List";

export default function Collection_View(){

    return(
        <div className="Lists_Display">
            <div className="Lists_Box">
                <Collection_Add/>
                <Collection_List/>
            </div>
        </div>
    )
}