import {useRef, useState } from "react";

export default function useItem_One(item){

    const [propertiesVisible, setPropertiesVisible] = useState(false)
    
    const ItemNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()

    // Lorsque l'utilisateur clique sur un item
    const handleClick = () => {
        // On change la vu des propriété en true ou false
        setPropertiesVisible(!propertiesVisible)
    }

    
    return{
        ItemNameRef,
        leftSideRef,
        toggleCoverRef,
        propertiesVisible,
        handleClick,
    }
}