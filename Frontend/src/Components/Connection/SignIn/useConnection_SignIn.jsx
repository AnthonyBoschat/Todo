import React, {} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_updateSignSelected } from "../ConnectionSlice";

export default function useConnection_SignIn(){

    const signInSelected = useSelector(store => store.connection.signInSelected)
    const dispatch = useDispatch()

    const handleChangePart = () => {
        dispatch(update_updateSignSelected("signin"))
    }

    return{
        signInSelected,
        handleChangePart
    }
}