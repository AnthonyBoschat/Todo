import React from "react";
import { useSelector } from "react-redux";
import Properties_Add from "../../Components/Properties/Add/Properties_Add";
import Properties_One from "../../Components/Properties/One/Properties_One";
import Properties_Creation from "../../Components/Properties/Creation/Properties_Creation";
import Properties_Save from "../../Components/Properties/Save/Properties_Save";
import Properties_List from "../../Components/Properties/List/Properties_List";

export default function Properties({optionsView, item}){

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
                    <div className="propertiesAdd_Display">
                        <Properties_Add/>
                        <Properties_Save/>
                    </div>

                    <Properties_List/>
                    
                    {propertyOnCreation && (<Properties_Creation/>)}

                </div>
            )}
        </div>
    )
}