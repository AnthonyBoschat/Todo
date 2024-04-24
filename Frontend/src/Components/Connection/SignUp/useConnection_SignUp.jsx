import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_updateSignSelected } from "../ConnectionSlice";
import useUser_Action from "../../User/UserAction";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useConnection_SignUp(){

    const signUpSelected = useSelector(store => store.connection.signUpSelected)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()
    const emailInputRef_signUp = useRef()
    const usernameInputRef_signUp = useRef()
    const passwordInputRef_signUp = useRef()
    const passwordConfirmInputRef_signUp = useRef()


    const handleChangePart = () => {
        dispatch(update_updateSignSelected("signup"))
    }

    const resetValidity = () => {
        passwordConfirmInputRef_signUp.current.setCustomValidity("")
    }

    const handleInscription = (e) => {
        e.preventDefault()
        const email = emailInputRef_signUp.current.value.toLowerCase()
        const userName = usernameInputRef_signUp.current.value
        const password = passwordInputRef_signUp.current.value
        const passwordConfirm = passwordConfirmInputRef_signUp.current.value
        
        if(password !== passwordConfirm){
            passwordConfirmInputRef_signUp.current.setCustomValidity("Password are not the same")
            e.target.reportValidity()
            return
        }

        const newUser = {
            userName:userName,
            userPassword:password,
            userEmail:email
        }
        fetchRequest("POST", "user/create", newUser)
    }



    return{
        signUpSelected,
        handleChangePart,
        emailInputRef_signUp,
        usernameInputRef_signUp,
        passwordInputRef_signUp,
        passwordConfirmInputRef_signUp,
        handleInscription,
        resetValidity
    }
}