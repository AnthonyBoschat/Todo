import React from "react";
import Item_Add from "../../Components/Item/Add/Item_Add";
import Item_List from "../../Components/Item/List/Item_List";
import Properties_BurgerMenu from "../../Components/Item/Properties/BurgerMenu/Properties_BurgerMenu";
import { useSelector } from "react-redux";


export default function Items(){

    const propertiesVisible = useSelector(store => store.item.propertiesVisible)

    return(
        <div className="Items_Display">
            <div className="Items_Box">
             <div className="headerItem_Box">
                <Properties_BurgerMenu/>
                {!propertiesVisible && (<Item_Add/>)}
                
            </div>
                
                {!propertiesVisible && (<Item_List/>)}
            </div>
        </div>
    )
}