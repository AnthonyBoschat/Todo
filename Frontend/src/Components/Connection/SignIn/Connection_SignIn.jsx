import React from "react";
import useConnection_SignIn from "./useConnection_SignIn";

export default function Connection_SignIn(){

    const {
        signInSelected,
        handleChangePart,
        handleConnect,
        emailInputRef_signIn,
        passwordInputRef_signIn,
        recoverCodeInputRef,
        recoverPassword,
        resetValidityEmailInput,
        switchRecoverPassword,
        userWantRecover,
        emailSend,
        checkCode,
        codeValide,
        newPasswordInputRef,
        confirmNewPasswordInputRef,
        validNewPassword,
        resetValidityNewPasswordConfirmInput
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
                <div className={!codeValide ? "slideContainer" : "slideContainer slideLeft"}>

                    <div className="form_section">
                        <div>
                            <label htmlFor="emailSignin">Email</label>
                            <input style={emailSend ? {pointerEvents:"none", opacity:"0.3"} : null} onChange={resetValidityEmailInput} required ref={emailInputRef_signIn} type="email" id="emailSignin" />
                        </div>
                    </div>

                    <div className="form_section">
                        <div className={!userWantRecover ? "slideContainer" : "slideContainer slideLeft"}>
                            <div className="noRecover">
                                <label htmlFor="passwordSignin">Password</label>
                                <input onChange={resetValidityNewPasswordConfirmInput} required ref={passwordInputRef_signIn} type="password" id="passwordSignin" />
                                <div onClick={switchRecoverPassword} className="forgetPassword_Box">
                                    Password forget ?
                                </div>
                            </div>
                            <div style={!emailSend ? {opacity:0.3} : null} className="recover">
                                <div>
                                    <label  htmlFor="recoverPasswordCode">Reset code</label>
                                    <input disabled={!emailSend} required={userWantRecover} ref={recoverCodeInputRef} type="text" id="recoverPasswordCode" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form_section test">
                            <div>
                                <label htmlFor="newPassword">New password</label>
                                <input ref={newPasswordInputRef} required={codeValide} type="password" id="newPassword" />
                            </div>
                            <div>
                                <label  htmlFor="newPasswordConfirm">New password confirm</label>
                                <input onChange={resetValidityNewPasswordConfirmInput} ref={confirmNewPasswordInputRef} required={codeValide} type="password" id="newPasswordConfirm" />
                            </div>
                    </div>
                </div>


                <div className="form_section">
                    <input className={!userWantRecover ? null : "backButton"} type={!userWantRecover ? "submit" : "button"} value={!userWantRecover ? "Connection" : "Back"} onClick={!userWantRecover ? null : switchRecoverPassword}/>

                    {!codeValide && (
                        <>
                            <input onClick={recoverPassword} className={!userWantRecover ? "recoverButton" : "recoverButton recoverButtonOn"} type="button" value={"Send email"} />
                            <input onClick={checkCode} className={!emailSend ? "recoverButton" : "recoverButton recoverButtonOn"} type="submit" value={"submit code"} />
                        </>
                    )}
                    {codeValide && (<input onClick={validNewPassword} type="button" value={"Confirm"}/>)}
                </div>

            </form>
        </div>
    )
} 

/* GERER LE PROBLEME DE MAIL ? Mailhog */
/* VERIFIER LE SLIDE JUSQUA CONFIRM MOT DE PASSE */
/* METTRE EN PLACE LA LOGIQUE DE REINITIALISATION DE MOT DE PASSE */