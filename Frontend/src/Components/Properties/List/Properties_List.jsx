import React from "react";
import Properties_One from "../One/Properties_One";
import Properties_Add from "../Add/Properties_Add";

export default function Properties_List({optionsView, item}){

    const listProperties = [
        {propertie:"Anniversaire", value:"22/10/1994"},
        {propertie:"Age", value:"29"},
        {propertie:"Téléphone", value:"06 01 29 50 80 "},
        {propertie:"Autre", value:null}
    ]


    return(
        <div className={`itemProperties_Display ${optionsView ? "visible" : "hidden"}`}>
            {optionsView && (
                <div className="itemProperties_Box">
                    <Properties_Add/>
                    <div className="propertiesList_Box">
                        {listProperties.map((propertie, index) => (
                            <Properties_One key={index} propertie={propertie}/>
                        ))}
                    </div>

                </div>
            )}
        </div>
    )
}