import React, { useState } from "react";
import { useSelector } from "react-redux";
import Properties_Add from "../../Components/Properties/Add/Properties_Add";
import Properties_One from "../../Components/Properties/One/Properties_One";
import Properties_Creation from "../../Components/Properties/Creation/Properties_Creation";
import Properties_Save from "../../Components/Properties/Save/Properties_Save";
import Properties_List from "../../Components/Properties/List/Properties_List";
import Properties_Manager from "../../Components/Properties/PropertiesManager";

export default function Properties({propertiesVisible, item}){
    const propertyOnCreation = useSelector(store => store.properties.propertyOnCreation)

    const [newPropertyName, setNewPropertyName] = useState("")
    const [newPropertyValue, setNewPropertyValue] = useState("")
    Properties_Manager()

    return(
        <div className={`itemProperties_Display ${propertiesVisible ? "visible" : "hidden"}`}>
            {propertiesVisible && (
                <div className="itemProperties_Box ">
                    <div className="propertiesAdd_Display">
                        <Properties_Add/>
                        <Properties_Save
                            item={item}
                            newPropertyName={newPropertyName}
                            newPropertyValue={newPropertyValue}
                        />
                    </div>

                    <Properties_List item={item}/>
                    
                    {propertyOnCreation && (
                        <Properties_Creation
                            setNewPropertyName={setNewPropertyName}
                            setNewPropertyValue={setNewPropertyValue}
                        />
                    )}

                </div>
            )}
        </div>
    )
}