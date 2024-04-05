import React from "react";
import useConnection_SignUp from "./useConnection_SignUp";

export default function Connection_SignUp(){

    const {
        signUpSelected,
        handleChangePart,
        emailInputRef_signUp,
        usernameInputRef_signUp,
        passwordInputRef_signUp,
        passwordConfirmInputRef_signUp,
        handleInscription,
        resetValidity
    } = useConnection_SignUp()

    return(
        <div className="signUp_Box">

            <div className="partIndicator_Box">
                <span onClick={handleChangePart} className={!signUpSelected ? "partIndicator partIndicatorUnfocus" : "partIndicator"}>
                    Sign up
                    <span className={signUpSelected ? "underline underlineFocus" : "underline"}></span>
                </span>
            </div>

            <form onSubmit={handleInscription} action="" className={!signUpSelected ? "formUnfocus" : null}>

                <div className="form_section">
                    <label htmlFor="email">Email</label>
                    <input required ref={emailInputRef_signUp} type="email" id="email" />
                </div>

                <div className="form_section">
                    <label htmlFor="usernameSignup">Username</label>
                    <input required ref={usernameInputRef_signUp} type="text" id="usernameSignup" />
                </div>


                <div className="form_section">
                    <label htmlFor="passwordSignup">Password</label>
                    <input onChange={resetValidity} required ref={passwordInputRef_signUp} type="password" id="passwordSignup" />
                </div>

                <div className="form_section">
                    <label htmlFor="confirmPassword">Password confirm</label>
                    <input onChange={resetValidity} required ref={passwordConfirmInputRef_signUp} type="password" id="confirmPassword" />
                </div>

                <div className="form_section">
                    <input type="submit" value="Inscription" />
                </div>

            </form>
        </div>
    )
}