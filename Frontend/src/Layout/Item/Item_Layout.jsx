import React from "react";
import Item_List from "../../Components/Item/List/Item_List";
import ItemsManager from "../../Components/Item/ItemManager";
import Item_Onglet from "../../Components/Item/Onglet/Item_Onglet";


export default function Item_Layout(){

    const {
        tabSelected
    } = ItemsManager()

    return(
        <div className="Items_Display">

            {/*Onglet*/}
            <div className="ongletBox">
                <Item_Onglet/>
            </div>


            <div className="Items_Box">
                {(tabSelected === "Items") && (<Item_List/>)}
                {(tabSelected === "Property") && (<div>Bonjour</div>)}
            </div>
        </div>
    )
}