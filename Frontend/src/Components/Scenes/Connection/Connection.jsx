import React from "react";
import useConnection from "./useConnection";

export default function Connection(){

    const {
        handleSubmit,
        handleInscription,
        usernameInputRef,
        passwordInputRef,
    } = useConnection()

    return(
        <div className="connection_Display">
            <div className="connection_Box">
                <form onSubmit={handleSubmit} action="">

                    <div className="username_password_Box">
                        <input required ref={usernameInputRef} className="usernameInput" placeholder="Nom d'utilisateur" type="text" />
                        <input required ref={passwordInputRef} className="passwordInput" placeholder="Mot de passe" type="password" />
                    </div>
                    
                    <div className="connection_inscription_Box">
                        <input className="connectionInput" value={"Connection"} type="submit" />
                        <input onClick={handleInscription} className="inscriptionInput" type="button" value={"Inscription"} />
                    </div>
                    
                </form>
            </div>
        </div>
    )
}