import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_closeConnection } from "../Connection/ConnectionSlice";

export default function useUser(){

    const dispatch = useDispatch()

    const handleClickDisconnection = () => {
        dispatch(update_closeConnection())
    }

    return{
        handleClickDisconnection
    }
}