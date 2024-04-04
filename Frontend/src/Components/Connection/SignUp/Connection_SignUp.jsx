import React from "react";
import useConnection_SignUp from "./useConnection_SignUp";

export default function Connection_SignUp(){

    const {
        signUpSelected,
        handleChangePart
    } = useConnection_SignUp()

    return(
        <div className="signUp_Box">

            <div className="partIndicator_Box">
                <span onClick={handleChangePart} style={!signUpSelected ? {opacity:0.5} : null} className="partIndicator">
                    Sign up
                    <span className={!signUpSelected ? "underline underlineOut_signUp" : "underline underlineIn_signUp"}></span>
                </span>
            </div>

            <form style={!signUpSelected ? {pointerEvents:"none"} : null} action="" className={!signUpSelected ? "formOpacityOut" : "formOpacityIn"}>

                <div className="form_section">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>

                <div className="form_section">
                    <label htmlFor="usernameSignup">Username</label>
                    <input type="text" id="usernameSignup" />
                </div>


                <div className="form_section">
                    <label htmlFor="passwordSignup">Password</label>
                    <input type="password" id="passwordSignup" />
                </div>

                <div className="form_section">
                    <label htmlFor="confirmPassword">Password confirm</label>
                    <input type="password" id="confirmPassword" />
                </div>

                <div className="form_section">
                    <input type="submit" value={"Inscription"} />
                </div>

            </form>
        </div>
    )
}