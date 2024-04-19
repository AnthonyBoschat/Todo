import React, { useEffect, useState } from "react";
import useProperties_One from "./useProperties_One";

export default function Property_Item_One({property, item, disaptchItemPropertyState, itemPropertyState}){
    
    const initialValue = property.value

    const handleChange = (e) => {
        // Si le texte revient à sa valeur initial, On le retire de la liste updateList
        if(e.target.innerText === initialValue){
            disaptchItemPropertyState({type:"removeUpdate", payload:property.propertyID})
            return
        }
        // Si le changement n'est pas détecter, on le détecte
        if(!itemPropertyState.updateDetected){
            disaptchItemPropertyState({type:"updateDetected", payload:true})
        }
        // Enfin, on ajoute une pair clef/valeur comportant l'ID de la propriété, et la nouvelle valeur
        disaptchItemPropertyState({type:"updateList", payload:{
            propertyID:property.propertyID,
            newValue:e.target.innerText
        }})
    }

    return(
        <div className="propertieBox">
            <span className="property">{property.name}</span>
            <span onInput={handleChange} contentEditable suppressContentEditableWarning={true} className="value">{property.value ? property.value : "N/A"}</span>
        </div>
    )
}