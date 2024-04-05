import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_codeValide, update_emailSend, update_updateSignSelected, update_userWantRecover } from "../ConnectionSlice";
import useUser_Request from "../../User/UserRequest";

export default function useConnection_SignIn(){

    const userWantRecover = useSelector(store => store.connection.recover.userWantRecover)
    const emailSend = useSelector(store => store.connection.recover.emailSend)
    const codeValide = useSelector(store => store.connection.recover.codeValide)
    const signInSelected = useSelector(store => store.connection.signInSelected)
    const dispatch = useDispatch()
    const {userRequest_Connect, userRequest_SendEmail_ResetPasswordCode, userRequest_checkCode} = useUser_Request()
    const emailInputRef_signIn = useRef()
    const passwordInputRef_signIn = useRef()
    const recoverCodeInputRef = useRef()
    const newPasswordInputRef = useRef()
    const confirmNewPasswordInputRef = useRef()
    

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

    const switchRecoverPassword = () => {
        setTimeout(() => {
            recoverCodeInputRef.current.value = ""
            dispatch(update_emailSend(false))
            dispatch(update_userWantRecover(!userWantRecover))
            dispatch(update_codeValide(false))
        }, 1);
    }




    const recoverPassword = () => {
        const email = emailInputRef_signIn.current.value.toLowerCase()
        const emailInput = emailInputRef_signIn.current
        // Je vérifie la validity de l'input email
        if(!emailInput.checkValidity()){

            if(emailInput.validity.valueMissing){
                emailInput.setCustomValidity("To reset your password, this field is required")
            }else if(emailInput.validity.typeMismatch){
                emailInput.setCustomValidity("Please provide a valid email")
            }
            emailInput.reportValidity()
        }else{
            userRequest_SendEmail_ResetPasswordCode(email)
        }
    }

    const checkCode = () => {
        const userResetCode = recoverCodeInputRef.current.value
        const userEmail = emailInputRef_signIn.current.value.toLowerCase()
        const codeInput = recoverCodeInputRef.current
        if(!codeInput.checkValidity()){

            if(codeInput.validity.valueMissing){
                codeInput.setCustomValidity("To reset your password, this field is required")
            }
            codeInput.reportValidity()
        }else{
            userRequest_checkCode(userResetCode, userEmail)
        }
    }

    return{
        signInSelected,
        handleChangePart,
        handleConnect,
        passwordInputRef_signIn,
        emailInputRef_signIn,
        recoverCodeInputRef,
        recoverPassword,
        resetValidity,
        switchRecoverPassword,
        userWantRecover,
        emailSend,
        checkCode,
        codeValide,
        newPasswordInputRef,
        confirmNewPasswordInputRef
    }
}