import React from "react";
import Property_Manager from "../PropertyManager";
import Property_Item_Save from "../Item_Save/Property_Item_Save";
import Property_Item_List from "../Item_List/Property_Item_List";

export default function Property_Item_Layout({propertiesVisible, item}){

    const {
        propertyState,
        propertyDispatch
    } = Property_Manager()

    

    return(
        <div className={`itemProperties_Display ${propertiesVisible ? "visible" : "hidden"}`}>
            {propertiesVisible && (
                <div className="itemProperties_Box ">
                    <div className="propertiesAdd_Display">
                        <Property_Item_Save
                            propertyState={propertyState}
                            item={item}
                        />
                    </div>

                    <Property_Item_List
                        propertyState={propertyState}
                        propertyDispatch={propertyDispatch}
                        item={item}
                    />
                </div>
            )}
        </div>
    )
}