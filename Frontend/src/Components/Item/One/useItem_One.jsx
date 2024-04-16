import {useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_itemSelectedID } from "../ItemSlice";
import { update_propertiesToShow } from "../../Properties/PropertiesSlice";

export default function useItem_One(item){

    const dispatch = useDispatch()
    const [propertiesVisible, setPropertiesVisible] = useState(false)
    
    const ItemRef = useRef()
    const ItemNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()

    const handleClick = () => {
        setPropertiesVisible(!propertiesVisible)
        if(propertiesVisible === true){
            dispatch(update_itemSelectedID(null))
        }
        if(propertiesVisible === false){
            dispatch(update_itemSelectedID(item._id))
        }
    }

    
    return{
        ItemRef,
        ItemNameRef,
        leftSideRef,
        toggleCoverRef,
        propertiesVisible,
        handleClick,
    }
}