import React from "react";
import { useSelector } from "react-redux";

export default function Popup(){

    const popupMessage = useSelector(store => store.popup.message)
    const popupColor = useSelector(store => store.popup.color)
    const connected = useSelector(store => store.connection.connected)

    return(
        <div style={{backgroundColor:popupColor}} className={!connected ? "popup_Box popupDisconnected" : "popup_Box popupConnected" }>
            {popupMessage}
        </div>
    )
}