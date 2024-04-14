import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertiesVisible } from "../../ItemSlice";

export default function Properties_BurgerMenu(){
    const dispatch = useDispatch()
    const propertiesVisible = useSelector(store => store.item.propertiesVisible)

    const handleClick = () => {
        dispatch(update_propertiesVisible(!propertiesVisible))
    }

    return(
        <i onClick={handleClick} className="fa-solid fa-bars propertyBurgerMenu"></i>
    )
}