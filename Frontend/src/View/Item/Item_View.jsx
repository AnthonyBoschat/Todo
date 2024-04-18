import React from "react";
import Item_List from "../../Components/Item/List/Item_List";
import ItemsManager from "../../Components/Item/ItemManager";
import Item_Onglet from "../../Components/Item/Onglet/Item_Onglet";
import Item_Layout from "../../Components/Item/Layout/Item_Layout";
import Item_Add from "../../Components/Item/Add/Item_Add";
import Property_Tab_List from "../../Components/Property/Tab_List/Property_Tab_List";
import Property_Tab_Add from "../../Components/Property/Tab_Add/Property_Tab_Add";


export default function Item_View(){

    const {
        tabSelected
    } = ItemsManager()

    return(
        <div className="Items_Display">

            {/*Onglet*/}
            <div className="ongletBox">
                <Item_Onglet/>
            </div>


            {/*Contenu principal*/}
            <div className="Items_Box">
                {/*Ajouter un élément*/}
                <div className="add_Box">
                    {(tabSelected === "Items") && (<Item_Add/>)}
                    {(tabSelected === "Property") && (<Property_Tab_Add/>)}
                </div>
                {/*List des éléments*/}
                <div className="list_Box">
                    {(tabSelected === "Items") && (<Item_List/>)}
                    {(tabSelected === "Property") && (<Property_Tab_List/>)}
                </div>
            </div>
        </div>
    )
}