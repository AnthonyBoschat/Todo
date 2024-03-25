import React, { useRef } from "react";
import useMongoDB from "../../Utils/useMongoDB";
import { useSelector } from "react-redux";

export default function useConnection(){

    
    const { mongoDB_saveNewUser, mongoDB_connectUser } = useMongoDB()

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
        mongoDB_connectUser(user)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inscrit l'utilisateur
    const handleInscription = () => {
        const formulaireValid = formRef.current.checkValidity() // Verification de la validité du formulaire
        if(!formulaireValid){
            return formRef.current.reportValidity() // Retour de ce qu'il manque (required)
        }else{
            const newUser = {
                userName:usernameInputRef.current.value,
                userPassword:passwordInputRef.current.value
            }
            mongoDB_saveNewUser(newUser) // Enregistrement de l'utilisateur
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