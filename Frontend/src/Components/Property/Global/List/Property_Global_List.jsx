import React from "react";
import { useSelector } from "react-redux";
import Property_Global_Creation from "../Creation/Property_Global_Creation";
import Property_Global_One from "../One/Property_Global_One";

export default function Property_Global_List({propertyToShow}){

    // const userPropertyList = useSelector(store => store.user.datas.userPropertyList)
    const propertyOnCreation = useSelector(store => store.property.propertyOnCreation)
    
    return(
        <>
            <div className="propertyList_Box">

                {/* Property_Global_List */}
                {propertyToShow.map((property, index) => (
                    <Property_Global_One property={property} key={index}/>
                ))}

                {/* Property_Global_Creation */}
                {propertyOnCreation && (
                    <Property_Global_Creation/>
                )}
            </div>
        </>
    )
}