import React from "react";
import Properties_One from "../One/Properties_One";
import { useSelector } from "react-redux";

export default function Properties_List({optionsView, item, propertyCanBeSaved, setPropertyCanBeSaved}){


    return(
        <>
            {item.properties.length > 0 && (
                <div className="propertiesList_Box">
                    {item.properties.map((property, index) => (
                        <Properties_One
                            item={item}
                            key={index}
                            property={property}
                            propertyCanBeSaved={propertyCanBeSaved}
                            setPropertyCanBeSaved={setPropertyCanBeSaved}
                        />
                    ))}
                </div>
            )}
            
        </>
    )
}