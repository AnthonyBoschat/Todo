import React from "react";
import Add_Folder from "../../Components/Folder/Add/Folder_Add";
import List_Folder from "../../Components/Folder/List/Folder_List";
import User from "../../Components/User/User";
import { useSelector } from "react-redux";

export default function Pannel(){

    const allDatasLoad = useSelector(store => store.user.allDatasLoad)
    const connected = useSelector(store => store.connection.connected)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)

    

    return(
        
        <div className="pannel_display">
            <div style={!connected ? {display:"none"} : null} className={!onDisconnection ? "pannel_Box apparition" : "pannel_Box disparition" }>

                {allDatasLoad && ( // Seulement quand tout les dossiers ont été chargé, on charge les autres composants
                    <>
                        <Add_Folder/>
                        <List_Folder/>
                        <User/>
                    </>
                )}
            </div>

        </div>
    )
}