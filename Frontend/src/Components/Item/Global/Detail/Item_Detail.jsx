import React from "react";
import Item_Property_Manager from "../../../Property/Item/Item_Property_Manager";
import Property_Item_Save from "../../../Property/Item/Save/Property_Item_Save"
import Property_Item_List from "../../../Property/Item/List/Property_Item_List"
import Item_Delete from "../Delete/Item_Delete";

export default function Item_Detail({propertiesVisible, item}){

    const {
        itemPropertyState,
        disaptchItemPropertyState
    } = Item_Property_Manager(item)

    return(
        <div className={`itemDetail_Display ${propertiesVisible ? "visible" : "hidden"}`}>
            {propertiesVisible && (
                <div className="itemDetail_Box ">
                    <div className="actions">
                        <Item_Delete itemID={item._id}/>
                        <Property_Item_Save disaptchItemPropertyState={disaptchItemPropertyState} itemPropertyState={itemPropertyState}/>
                    </div>

                    <div className="property_list">
                        <Property_Item_List
                            itemPropertyState={itemPropertyState}
                            disaptchItemPropertyState={disaptchItemPropertyState}
                            item={item}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}