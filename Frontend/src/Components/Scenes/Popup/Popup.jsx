import React from "react";
import { useSelector } from "react-redux";

export default function Popup(){

    const popupMessage = useSelector(store => store.popup.message)
    const popupColor = useSelector(store => store.popup.color)

    return(
        <div style={{backgroundColor:popupColor}} className="popup_Box">
            {popupMessage}
        </div>
    )
}