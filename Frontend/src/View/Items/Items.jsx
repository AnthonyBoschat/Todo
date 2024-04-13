import React from "react";
import Item_Add from "../../Components/Item/Add/Item_Add";
import Item_List from "../../Components/Item/List/Item_List";


export default function Items(){

    

    return(
        <div className="Items_Display">
            <div className="Items_Box">
                <Item_Add/>
                
                <Item_List/>
            </div>
        </div>
    )
}