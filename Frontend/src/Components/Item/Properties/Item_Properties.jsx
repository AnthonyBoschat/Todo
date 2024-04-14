import React, { useEffect, useRef } from "react";
import Item_PropertiesOne from "./One/Item_PropertiesOne";

export default function Item_Properties({optionsView, item}){

    const listProperties = [
        // {propertie:"Anniversaire", value:"22/10/1994"},
        // {propertie:"Age", value:"29"},
        // {propertie:"Téléphone", value:"06 01 29 50 80 "},
        // {propertie:"Autre", value:null}
    ]

    return(
        <div className={`itemProperties_Display ${optionsView ? "visible" : "hidden"}`}>
            {optionsView && (
                <div className="itemProperties_Box">
                    {listProperties.map((propertie, index) => (
                        <Item_PropertiesOne key={index} propertie={propertie}/>
                    ))}
                </div>
            )}
        </div>
    )
}