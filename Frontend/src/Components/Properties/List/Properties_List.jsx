import React from "react";
import Properties_One from "../One/Properties_One";
import { useSelector } from "react-redux";

export default function Properties_List({item, propertyState, propertyDispatch}){


    return(
        <>
            {item.properties.length > 0 && (
                <div className="propertiesList_Box">
                    {item.properties.map((property, index) => (
                        <Properties_One
                            item={item}
                            key={index}
                            property={property}
                            propertyState={propertyState}
                            propertyDispatch={propertyDispatch}
                        />
                    ))}
                </div>
            )}
            
        </>
    )
}