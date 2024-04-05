import React from "react";
import useConnection_SignIn from "./useConnection_SignIn";

export default function Connection_SignIn(){

    const {
        signInSelected,
        handleChangePart,
        handleConnect,
        emailInputRef_signIn,
        passwordInputRef_signIn,
    } = useConnection_SignIn()

    return(
        <div className="signIn_Box">
            <div className="partIndicator_Box">
                <span onClick={handleChangePart} className={!signInSelected ? "partIndicator partIndicatorUnfocus" : "partIndicator"}>
                    Sign in
                    <span className={signInSelected ? "underline underlineFocus" : "underline"}></span>
                </span>
            </div>

            <form onSubmit={handleConnect} action="" className={!signInSelected ? "formUnfocus" : null}>

                <div className="form_section">
                    <label htmlFor="emailSignin">Email</label>
                    <input ref={emailInputRef_signIn} type="email" id="emailSignin" />
                </div>

                <div className="form_section">
                    <label htmlFor="passwordSignin">Password</label>
                    <input ref={passwordInputRef_signIn} type="password" id="passwordSignin" />
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