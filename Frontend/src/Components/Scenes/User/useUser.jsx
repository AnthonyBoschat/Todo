import { useDispatch } from "react-redux";
import {update_onDisconnection } from "../Connection/ConnectionSlice";
import useLocalStorage from "../../../Utils/useLocalStorage";

export default function useUser(){

    const dispatch = useDispatch()
    const {mongoDB_disconnectUser} = useLocalStorage()

    const handleClickDisconnection = () => {
        dispatch(update_onDisconnection(true))
        
        setTimeout(() => {
            mongoDB_disconnectUser()
        }, 350);
    }

    return{
        handleClickDisconnection
    }
}