import React from "react";
import { useSelector } from "react-redux";

export default function Popup(){

    const popup = useSelector(store => store.popup)
    const popupHidden = useSelector(store => store.popup.hidden)

    const connected = useSelector(store => store.connection.connected)



    return(
        <>
            {!popupHidden && (
                <div style={{backgroundColor:popup.color}} className={!connected ? "popup_Box popupDisconnected" : "popup_Box popupConnected" }>
                    {popup.message}
                </div>
            )}
        </>
        
    )
}