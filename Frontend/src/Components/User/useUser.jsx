import { useDispatch } from "react-redux";
import {update_onDisconnection } from "../Connection/ConnectionSlice";
import useUser_Request from "./UserRequest";

export default function useUser(){

    const dispatch = useDispatch()
    const {userRequest_Disconnect} = useUser_Request()

    const handleClickDisconnection = () => {
        dispatch(update_onDisconnection(true))
        
        setTimeout(() => {
            userRequest_Disconnect()
        }, 350);
    }

    return{
        handleClickDisconnection
    }
}