import React from "react";
import Connection_SignIn from "./SignIn/Connection_SignIn";
import Connection_SignUp from "./SignUp/Connection_SignUp";

export default function Connection(){




    return(
        <div className="connection_Display">
            <div className="connection_Box">

                {/* SignIn */}
                <Connection_SignIn/>

                <div className="separator">
                </div>

                {/* SignUp */}
                <Connection_SignUp/>

            </div>
        </div>
    )
}