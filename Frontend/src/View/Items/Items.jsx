import React from "react";
import Item_Add from "../../Components/Item/Add/Item_Add";
import List_Item from "../../Components/Item/List/Item_List";


export default function Items(){

    

    return(
        <div className="Items_Display">
            <Item_Add/>
            
                <List_Item/>
        </div>
    )
}