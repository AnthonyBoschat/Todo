import React, { useRef } from "react";
import useLocalStorage from "../../../Utils/useLocalStorage";
import { useSelector } from "react-redux";

export default function useConnection(){

    const popup = useSelector(store => store.connection.popup)
    const popupMessage = useSelector(store => store.connection.popupMessage)
    const connected = useSelector(store => store.connection.connected)
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const formRef = useRef()
    const {
        mongoDB_saveNewUser
    } = useLocalStorage()

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Connecte l'utilisateur
    const handleSubmit = (e) => {
        e.preventDefault()
        // const userName = usernameInputRef.current.value
        // const password = passwordInputRef.current.value
        // console.log(`userName : ${userName} \npassword : ${password}`)
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