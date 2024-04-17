import React from "react";
import Item_Add from "../../Components/Item/Add/Item_Add";
import Item_List from "../../Components/Item/List/Item_List";
import { useSelector } from "react-redux";
import ItemsManager from "../../Components/Item/ItemManager";


export default function Items(){

    ItemsManager()

    return(
        <div className="Items_Display">
            
            <div className="Items_Box">
                <div className="headerItem_Box">
                    <Item_Add/>
                </div>
                
                <Item_List/>
            </div>
        </div>
    )
}