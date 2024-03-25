import React, { useRef } from "react";
import useMongoDB from "../../Utils/useMongoDB";
import { useSelector } from "react-redux";

export default function useConnection(){

    const connected = useSelector(store => store.connection.connected)
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const formRef = useRef()
    const {
        mongoDB_saveNewUser,
        mongoDB_connectUser
    } = useMongoDB()

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
        const formulaireValid = formRef.current.checkValidity()
        if(!formulaireValid){
            return formRef.current.reportValidity()
        }else{
            const newUser = {
                userName:usernameInputRef.current.value,
                userPassword:passwordInputRef.current.value
            }
            mongoDB_saveNewUser(newUser)
        }
    }

    return{
        handleSubmit,
        handleInscription,
        usernameInputRef,
        passwordInputRef,
        connected,
        formRef
    }
}