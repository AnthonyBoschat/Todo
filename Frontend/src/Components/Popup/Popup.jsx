import React from "react";
import { useSelector } from "react-redux";

export default function Popup(){

    const popup = useSelector(store => store.popup)
    const popupHidden = useSelector(store => store.popup.hidden)




    return(
        <>
            {!popupHidden && (
                <div className="popup_Display">
                    <div style={{backgroundColor:popup.color}} className="popup_Box">
                        {popup.message}
                    </div>
                </div>
            )}
        </>
        
    )
}