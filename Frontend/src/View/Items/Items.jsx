import React from "react";
import Item_Add from "../../Components/Item/Add/Item_Add";
import Item_List from "../../Components/Item/List/Item_List";
import { useSelector } from "react-redux";


export default function Items(){

    const propertiesVisible = useSelector(store => store.properties.propertiesVisible)

    return(
        <div className="Items_Display">
            
            <div className="Items_Box">
                <div className="headerItem_Box">
                    {!propertiesVisible && (<Item_Add/>)}
                </div>
                
                {!propertiesVisible && (<Item_List/>)}
                {propertiesVisible && (<h1>Bonour</h1>)}
            </div>
        </div>
    )
}