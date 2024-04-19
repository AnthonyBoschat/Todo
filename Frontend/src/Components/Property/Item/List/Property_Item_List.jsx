import React from "react";
import { useSelector } from "react-redux";
import Properties_One from "../One/Property_Item_One";

export default function Properties_List({item}){


    

    return(
        <>
            {item.properties.length > 0 && (
                <div className="propertiesList_Box">
                    {item.properties.map((property, index) => (
                        <Properties_One
                            item={item}
                            key={index}
                            property={property}
                        />
                    ))}
                </div>
            )}
            
        </>
    )
}