import React from "react";
import { useSelector } from "react-redux";
import useUser from "./useUser";

export default function User(){

    const userName = useSelector(store => store.connection.connectedUser.name)
    const {
        handleClickDisconnection
    } = useUser()
    return(
        <>
            {userName && (
                <div className="user_Display">
                    <div className="user_Box">
                        {userName}
                    </div>
                    <i onClick={handleClickDisconnection} className="disconnection fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            )}
        </>
    )
}