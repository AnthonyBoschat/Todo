import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_codeValide, update_emailSend, update_updateSignSelected, update_userWantRecover } from "../ConnectionSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useConnection_SignIn(){

    const userWantRecover = useSelector(store => store.connection.recover.userWantRecover)
    const emailSend = useSelector(store => store.connection.recover.emailSend)
    const codeValide = useSelector(store => store.connection.recover.codeValide)
    const signInSelected = useSelector(store => store.connection.signInSelected)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()
    const emailInputRef_signIn = useRef()
    const passwordInputRef_signIn = useRef()
    const recoverCodeInputRef = useRef()
    const newPasswordInputRef = useRef()
    const confirmNewPasswordInputRef = useRef()
    

    const handleChangePart = () => {
        dispatch(update_updateSignSelected("signin"))
    }

    const resetValidityEmailInput = () => {
        emailInputRef_signIn.current.setCustomValidity("")
    }
    const resetValidityNewPasswordConfirmInput = () => {
        confirmNewPasswordInputRef.current.setCustomValidity("")
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Connecte l'utilisateur
    const handleConnect = (e) => {
        e.preventDefault()
        const user = {
            userEmail:emailInputRef_signIn.current.value.toLowerCase(),
            userPassword:passwordInputRef_signIn.current.value
        }
        fetchRequest("POST", "user/connect", user)
    }

    const switchRecoverPassword = () => {
        setTimeout(() => {
            recoverCodeInputRef.current.value = ""
            newPasswordInputRef.current.value = ""
            confirmNewPasswordInputRef.current.value = ""
            dispatch(update_emailSend(false))
            dispatch(update_userWantRecover(!userWantRecover))
            dispatch(update_codeValide(false))
        }, 1);
    }




    const recoverPassword = () => {
        const userEmail = emailInputRef_signIn.current.value.toLowerCase()
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
            fetchRequest("POST", `recovery/sendRecoverPasswordEmail`, {userEmail})
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
            fetchRequest("POST", `recovery/checkResetPasswordCode`, {userResetCode, userEmail})
        }
    }

    const validNewPassword = (e) => {
        const newPassword = newPasswordInputRef.current.value
        const newPasswordConfirm = confirmNewPasswordInputRef.current.value
        const userEmail = emailInputRef_signIn.current.value.toLowerCase()
        if(newPassword !== newPasswordConfirm){
            confirmNewPasswordInputRef.current.setCustomValidity("Password are not the same")
            confirmNewPasswordInputRef.current.reportValidity()
            return
        }
        fetchRequest("PUT", `recovery/changePassword/${userEmail}`, {userNewPassword:newPasswordConfirm})
    }

    return{
        signInSelected,
        handleChangePart,
        handleConnect,
        passwordInputRef_signIn,
        emailInputRef_signIn,
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
    }
}