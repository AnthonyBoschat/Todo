import React from "react";
import Properties_One from "../One/Properties_One";

export default function Properties_List({optionsView, item, propertiesToShow}){


    return(
        <div className="propertiesList_Box">
            {propertiesToShow.map((propertie, index) => (
                <Properties_One item={item} key={index} propertie={propertie}/>
            ))}
        </div>
    )
}