import React, { useRef } from "react";
import useLocalStorage from "../../../Utils/useLocalStorage";

export default function useConnection(){

    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
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
        const newUser = {
            userName:usernameInputRef.current.value,
            userPassword:passwordInputRef.current.value
        }
        console.log(`userName : ${newUser.userName} \npassword : ${newUser.userPassword}`)
        mongoDB_saveNewUser(newUser)
    }

    return{
        handleSubmit,
        handleInscription,
        usernameInputRef,
        passwordInputRef,
    }
}