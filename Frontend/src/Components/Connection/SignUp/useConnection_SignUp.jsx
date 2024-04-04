import React, {} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_updateSignSelected } from "../ConnectionSlice";

export default function useConnection_SignUp(){

    const signUpSelected = useSelector(store => store.connection.signUpSelected)
    const dispatch = useDispatch()

    const handleChangePart = () => {
        console.log("0")
        dispatch(update_updateSignSelected("signup"))
    }

    return{
        signUpSelected,
        handleChangePart
    }
}