import React from "react";
import useConnection_SignIn from "./useConnection_SignIn";

export default function Connection_SignIn(){

    const {
        signInSelected,
        handleChangePart
    } = useConnection_SignIn()

    return(
        <div className="signIn_Box">
            <div className="partIndicator_Box">
                <span onClick={handleChangePart} style={!signInSelected ? {opacity:0.5} : null} className="partIndicator">
                    Sign in
                    <span className={!signInSelected ? "underline underlineOut_signIn" : "underline underlineIn_signIn"}></span>
                </span>
                
            </div>

            <form style={!signInSelected ? {pointerEvents:"none"} : null} action="" className={!signInSelected ? "formOpacityOut" : "formOpacityIn"}>

                <div className="form_section">
                    <label htmlFor="usernameSignin">Username</label>
                    <input type="text" id="usernameSignin" />
                </div>

                <div className="form_section">
                    <label htmlFor="passwordSignin">Password</label>
                    <input type="password" id="passwordSignin" />
                    <div className="forgetPassword_Box">
                        password forgot ?
                    </div>
                </div>

                <div className="form_section">
                    <input type="submit" value={"Connection"} />
                </div>

            </form>
        </div>
    )
}