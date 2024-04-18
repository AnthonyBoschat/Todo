import React from "react";
import Properties_Manager from "../PropertiesManager";
import Properties_Save from "./Save/Property_Save";
import Property_List from "./List/Property_List";

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
                        <Properties_Save
                            propertyState={propertyState}
                            item={item}
                        />
                    </div>

                    <Property_List
                        propertyState={propertyState}
                        propertyDispatch={propertyDispatch}
                        item={item}
                    />
                </div>
            )}
        </div>
    )
}