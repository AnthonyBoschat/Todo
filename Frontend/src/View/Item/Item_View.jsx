import React from "react";
import Item_List from "../../Components/Item/Global/List/Item_List";
import ItemManager from "../../Components/Item/Global/ItemGlobal_Manager";
import Item_Onglet from "../../Components/Item/Global/Onglet/Item_Onglet";
import Item_Add from "../../Components/Item/Global/Add/Item_Add";
import Property_Global_List from "../../Components/Property/Global/List/Property_Global_List";
import Property_Global_Add from "../../Components/Property/Global/Add/Property_Global_Add";
import Global_Property_Manager from "../../Components/Property/Global/Global_Property_Manager";


export default function Item_View(){

    const {
        tabSelected
    } = ItemManager()

    const {
        propertyToShow
    } = Global_Property_Manager()



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
                    {(tabSelected === "Property") && (<Property_Global_Add/>)}
                </div>
                {/*List des éléments*/}
                <div className="list_Box">
                    {(tabSelected === "Items") && (<Item_List/>)}
                    {(tabSelected === "Property") && (<Property_Global_List propertyToShow={propertyToShow}/>)}
                </div>
            </div>
        </div>
    )
}