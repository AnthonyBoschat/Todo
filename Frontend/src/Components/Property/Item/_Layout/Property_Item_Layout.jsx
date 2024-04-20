import React from "react";
import Property_Manager from "../../Global/Global_Property_Manager";
import Property_Item_Save from "../Save/Property_Item_Save";
import Property_Item_List from "../List/Property_Item_List";
import Item_Property_Manager from "../Item_Property_Manager";

export default function Property_Item_Layout({propertiesVisible, item}){

    const {
        itemPropertyState,
        disaptchItemPropertyState
    } = Item_Property_Manager(item)

    return(
        <div className={`itemProperties_Display ${propertiesVisible ? "visible" : "hidden"}`}>
            {propertiesVisible && (
                <div className="itemProperties_Box ">
                    <div className="propertiesAdd_Display">
                        <Property_Item_Save disaptchItemPropertyState={disaptchItemPropertyState} itemPropertyState={itemPropertyState}/>
                    </div>

                    <Property_Item_List
                        itemPropertyState={itemPropertyState}
                        disaptchItemPropertyState={disaptchItemPropertyState}
                        item={item}
                    />
                </div>
            )}
        </div>
    )
}