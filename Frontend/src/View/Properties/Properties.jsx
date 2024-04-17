import React from "react";
import Properties_Add from "../../Components/Properties/Add/Properties_Add";
import Properties_Creation from "../../Components/Properties/Creation/Properties_Creation";
import Properties_Save from "../../Components/Properties/Save/Properties_Save";
import Properties_List from "../../Components/Properties/List/Properties_List";
import Properties_Manager from "../../Components/Properties/PropertiesManager";

export default function Properties({propertiesVisible, item}){

    const {
        propertyState,
        propertyDispatch
    } = Properties_Manager()

    

    return(
        <div className={`itemProperties_Display ${propertiesVisible ? "visible" : "hidden"}`}>
            {propertiesVisible && (
                <div className="itemProperties_Box ">
                    <div className="propertiesAdd_Display">
                        <Properties_Add
                            propertyState={propertyState}
                            propertyDispatch={propertyDispatch}
                         />
                        <Properties_Save
                            propertyState={propertyState}
                            item={item}
                        />
                    </div>

                    <Properties_List
                        propertyState={propertyState}
                        propertyDispatch={propertyDispatch}
                        item={item}
                    />
                    
                    {(propertyState.onCreation) && (
                        <Properties_Creation
                            propertyState={propertyState}
                            propertyDispatch={propertyDispatch}
                        />
                    )}

                </div>
            )}
        </div>
    )
}