import React from "react";
import Property_Manager from "../PropertyManager";
import Property_Item_Save from "../Item_Save/Property_Item_Save";
import Property_Item_List from "../Item_List/Property_Item_List";

export default function Property_Item_Layout({propertiesVisible, item}){

    Property_Manager(item)

    

    return(
        <div className={`itemProperties_Display ${propertiesVisible ? "visible" : "hidden"}`}>
            {propertiesVisible && (
                <div className="itemProperties_Box ">
                    <div className="propertiesAdd_Display">
                        <Property_Item_Save/>
                    </div>

                    <Property_Item_List
                        item={item}
                    />
                </div>
            )}
        </div>
    )
}