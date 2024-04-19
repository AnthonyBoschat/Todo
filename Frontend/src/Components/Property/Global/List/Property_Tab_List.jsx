import React from "react";
import { useSelector } from "react-redux";
import Property_Tab_Creation from "../Creation/Property_Tab_Creation";
import Property_Tab_One from "../One/Property_Tab_One";

export default function Property_Tab_List({propertyToShow}){

    // const userPropertyList = useSelector(store => store.user.datas.userPropertyList)
    const propertyOnCreation = useSelector(store => store.property.propertyOnCreation)
    
    return(
        <>
            <div className="propertyList_Box">

                {/* Property_Tab_List */}
                {propertyToShow.map((property, index) => (
                    <Property_Tab_One property={property} key={index}/>
                ))}

                {/* Property_Tab_Creation */}
                {propertyOnCreation && (
                    <Property_Tab_Creation/>
                )}
            </div>
        </>
    )
}