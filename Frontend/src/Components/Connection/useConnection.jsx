import React, { useRef } from "react";
import useUser_Request from "../User/UserRequest";

export default function useConnection(){


    const {userRequest_Create, userRequest_Connect} = useUser_Request()

    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const formRef = useRef()

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Connecte l'utilisateur
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            userName:usernameInputRef.current.value,
            userPassword:passwordInputRef.current.value
        }
        userRequest_Connect(user)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inscrit l'utilisateur
    const handleInscription = (e) => {
        e.preventDefault()
        const formulaireValid = formRef.current.checkValidity() // Verification de la validité du formulaire
        if(!formulaireValid){
            return formRef.current.reportValidity() // Retour de ce qu'il manque (required)
        }else{
            const newUser = {
                userName:usernameInputRef.current.value,
                userPassword:passwordInputRef.current.value
            }
            userRequest_Create(newUser) // Enregistrement de l'utilisateur
        }
    }

    return{
        handleSubmit,
        handleInscription,
        usernameInputRef,
        passwordInputRef,
        formRef
    }
}