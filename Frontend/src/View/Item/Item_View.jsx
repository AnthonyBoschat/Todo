import React from "react";
import Item_List from "../../Components/Item/List/Item_List";
import ItemManager from "../../Components/Item/ItemManager";
import Item_Onglet from "../../Components/Item/Onglet/Item_Onglet";
import Item_Add from "../../Components/Item/Add/Item_Add";
import Property_Tab_List from "../../Components/Property/Global/List/Property_Tab_List";
import Property_Tab_Add from "../../Components/Property/Global/Add/Property_Tab_Add";
import Property_Manager from "../../Components/Property/PropertyManager";


export default function Item_View(){

    const {
        tabSelected
    } = ItemManager()

    const {
        propertyToShow
    } = Property_Manager()



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
                    {(tabSelected === "Property") && (<Property_Tab_List propertyToShow={propertyToShow}/>)}
                </div>
            </div>
        </div>
    )
}