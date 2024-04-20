import React from "react";
import { useSelector } from "react-redux";
import Properties_One from "../One/Property_Item_One";

export default function Properties_List({item, disaptchItemPropertyState, itemPropertyState}){

    

    return(
        <>
            {item.property && (
                <div className="propertiesList_Box">
                    {Object.entries(item.property).map((property, index) => (
                        <Properties_One
                            itemPropertyState={itemPropertyState}
                            disaptchItemPropertyState={disaptchItemPropertyState}
                            key={index}
                            property={property}
                        />
                    ))}
                    {/* {item.properties.map((property, index) => (
                        <Properties_One
                            itemPropertyState={itemPropertyState}
                            disaptchItemPropertyState={disaptchItemPropertyState}
                            key={index}
                            property={property}
                        />
                    ))} */}
                </div>
            )}
            
        </>
    )
}