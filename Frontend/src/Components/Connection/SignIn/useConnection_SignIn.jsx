import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_updateSignSelected } from "../ConnectionSlice";
import useUser_Request from "../../User/UserRequest";

export default function useConnection_SignIn(){

    const signInSelected = useSelector(store => store.connection.signInSelected)
    const dispatch = useDispatch()
    const {userRequest_Connect} = useUser_Request()
    const emailInputRef_signIn = useRef()
    const passwordInputRef_signIn = useRef()

    const handleChangePart = () => {
        dispatch(update_updateSignSelected("signin"))
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

    return{
        signInSelected,
        handleChangePart,
        handleConnect,
        passwordInputRef_signIn,
        emailInputRef_signIn,
    }
}