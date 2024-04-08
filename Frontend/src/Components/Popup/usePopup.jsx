import { update_popup } from "./PopupSlice";
import { useDispatch } from "react-redux";

export default function usePopup(){

    const dispatch = useDispatch()

    const popup = async (newPopupConfiguration) => {
        await dispatch(update_popup({hidden:true}))
        newPopupConfiguration.hidden = false
        switch(newPopupConfiguration.color){
            case "neutral":
                newPopupConfiguration.color = "rgb(237, 237, 237)"
                break
            case "good":
                newPopupConfiguration.color = "rgb(201, 250, 254)"
                break
            case "bad" :
                newPopupConfiguration.color = "rgb(255, 216, 216)"
                break
            case "debug":
                newPopupConfiguration.color = "rgb(205, 148, 255)"
                break
        }
        dispatch(update_popup(newPopupConfiguration))
    }

    return{
        popup
    }
}