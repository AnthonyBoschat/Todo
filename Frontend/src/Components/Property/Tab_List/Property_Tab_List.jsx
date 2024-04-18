import React from "react";
import { useSelector } from "react-redux";
import Property_Tab_Creation from "../Tab_Creation/Property_Tab_Creation";

export default function Property_Tab_List(){

    const userPropertyList = useSelector(store => store.user.datas.userPropertyList)
    const propertyOnCreation = useSelector(store => store.property.propertyOnCreation)

    return(
        <>
            <div className="propertyList_Box">

                {/* Property_Tab_List */}
                {userPropertyList.map((property, index) => (
                    <div key={index} className="oneProperty">
                        {property.name}
                    </div>
                ))}

                {/* Property_Tab_Creation */}
                {propertyOnCreation && (
                    <Property_Tab_Creation/>
                )}
            </div>
        </>
    )
}