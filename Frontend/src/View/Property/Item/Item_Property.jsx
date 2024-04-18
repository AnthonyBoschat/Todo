import React from "react";
import Properties_Add from "../../../Components/Property/Tab/Add/Properties_Add";
import Properties_Creation from "../../../Components/Property/Tab/Creation/Properties_Creation";
import Properties_Manager from "../../../Components/Property/PropertyManager";
import Properties_Save from "../../../Components/Property/Item_Save/Property_Item_Save";
import Property_List from "../../../Components/Property/Item_List/Property_Item_List";

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
                        {/* <Properties_Add
                            propertyState={propertyState}
                            propertyDispatch={propertyDispatch}
                         /> */}
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
                    
                    {/* {(propertyState.onCreation) && (
                        <Properties_Creation
                            propertyState={propertyState}
                            propertyDispatch={propertyDispatch}
                        />
                    )} */}

                </div>
            )}
        </div>
    )
}