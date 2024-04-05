import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_updateSignSelected } from "../ConnectionSlice";
import useUser_Request from "../../User/UserRequest";

export default function useConnection_SignIn(){

    const signInSelected = useSelector(store => store.connection.signInSelected)
    const dispatch = useDispatch()
    const {userRequest_Connect, userRequest_SendEmail_ResetPasswordCode} = useUser_Request()
    const emailInputRef_signIn = useRef()
    const passwordInputRef_signIn = useRef()

    const handleChangePart = () => {
        dispatch(update_updateSignSelected("signin"))
    }

    const resetValidity = () => {
        emailInputRef_signIn.current.setCustomValidity("")
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Connecte l'utilisateur
    const handleConnect = (e) => {
        e.preventDefault()
        const user = {
            userEmail:emailInputRef_signIn.current.value.toLowerCase(),
            userPassword:passwordInputRef_signIn.current.value
        }
        userRequest_Connect(user)
    }

    const recoverPassword = () => {
        const email = emailInputRef_signIn.current.value.toLowerCase()
        const emailInput = emailInputRef_signIn.current
        // Je vérifie la validity de l'input email
        if(!emailInput.checkValidity()){

            if(emailInput.validity.valueMissing){
                emailInput.setCustomValidity("To recover your password, this field is required")
            }else if(emailInput.validity.typeMismatch){
                emailInput.setCustomValidity("Please provide a valid email")
            }
            emailInput.reportValidity()
        }else{
            userRequest_SendEmail_ResetPasswordCode(email)
        }

        
    }

    return{
        signInSelected,
        handleChangePart,
        handleConnect,
        passwordInputRef_signIn,
        emailInputRef_signIn,
        recoverPassword,
        resetValidity
    }
}