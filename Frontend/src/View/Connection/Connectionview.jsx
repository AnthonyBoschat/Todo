import React from "react";
import Connection_SignIn from "../../Components/Connection/SignIn/Connection_SignIn";
import Connection_SignUp from "../../Components/Connection/SignUp/Connection_SignUp";

export default function Connectionview(){

    return(
        <div className="connection_Display">
            <div className="connection_Box">

                {/* SignIn */}
                <Connection_SignIn/>

                <div className="separator">
                </div>

                <Connection_SignUp/>


                {/* SignUp */}

            </div>
        </div>
    )
}