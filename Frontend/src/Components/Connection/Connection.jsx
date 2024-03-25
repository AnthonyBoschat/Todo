import React from "react";
import useConnection from "./useConnection";

export default function Connection(){

    const {
        handleSubmit,
        handleInscription,
        usernameInputRef,
        passwordInputRef,
        formRef
    } = useConnection()

    return(
        <div className="connection_Display">
            <div className="connection_Box">
                <form ref={formRef} onSubmit={handleSubmit} action="">

                    <div className="username_password_Box">
                        <input required ref={usernameInputRef} className="usernameInput" placeholder="Username" type="text" />
                        <input required ref={passwordInputRef} className="passwordInput" placeholder="Password" type="password" />
                    </div>
                    
                    <div className="connection_inscription_Box">
                        <input className="connectionInput" value="Sign in" type="submit" />
                        <input onClick={handleInscription} className="inscriptionInput" type="button" value="Sign up" />
                    </div>
                    
                </form>
            </div>
        </div>
    )
}