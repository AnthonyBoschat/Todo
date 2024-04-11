import { useDispatch } from "react-redux";
import {update_onDisconnection } from "../Connection/ConnectionSlice";
import useFetchRequest from "../../Utils/useFetchRequest";

export default function useUser(){

    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    const handleClickDisconnection = () => {
        dispatch(update_onDisconnection(true))
        
        setTimeout(() => {
            fetchRequest("GET", "user/disconnect")
        }, 350);
    }

    return{
        handleClickDisconnection
    }
}