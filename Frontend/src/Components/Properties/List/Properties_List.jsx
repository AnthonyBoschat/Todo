import React from "react";
import Properties_One from "../One/Properties_One";
import Properties_Add from "../Add/Properties_Add";
import { useSelector } from "react-redux";
import Properties_Creation from "../Creation/Properties_Creation";

export default function Properties_List({optionsView, item}){

    const listProperties = [
        {propertie:"Anniversaire", value:"22/10/1994"},
        {propertie:"Age", value:"29"},
        {propertie:"Téléphone", value:"06 01 29 50 80 "},
        {propertie:"Autre", value:null}
    ]

    const propertyOnCreation = useSelector(store => store.properties.propertyOnCreation)


    return(
        <div className={`itemProperties_Display ${optionsView ? "visible" : "hidden"}`}>
            {optionsView && (
                <div className="itemProperties_Box ">
                    <Properties_Add/>
                    <div className="propertiesList_Box">
                        {listProperties.map((propertie, index) => (
                            <Properties_One key={index} propertie={propertie}/>
                        ))}
                    </div>
                    {propertyOnCreation && (<Properties_Creation/>)}

                </div>
            )}
        </div>
    )
}