import React from "react";
import Properties_One from "../One/Properties_One";
import { useSelector } from "react-redux";

export default function Properties_List({optionsView, item, propertyCanBeSaved, setPropertyCanBeSaved}){

    const propertiesToShow = useSelector(store => store.properties.propertiesToShow)

    return(
        <>
            {propertiesToShow.length > 0 && (
                <div className="propertiesList_Box">
                    {propertiesToShow.map((propertie, index) => (
                        <Properties_One
                            item={item} 
                            key={index} 
                            propertie={propertie}
                            propertyCanBeSaved={propertyCanBeSaved}
                            setPropertyCanBeSaved={setPropertyCanBeSaved}
                        />
                    ))}
                </div>
            )}
            
        </>
    )
}