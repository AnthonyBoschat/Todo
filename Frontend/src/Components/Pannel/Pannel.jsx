import React, { useEffect } from "react";
import Add_Folder from "../Folder/Add/Folder";
import List_Folder from "../Folder/List/Folder";
import User from "../User/User";
import { useDispatch } from "react-redux";
import useBackend from "../../Utils/useBackend";
import { update_allFoldersLoad, update_loadFoldersList } from "../Folder/FolderSlice";
import { useSelector } from "react-redux";
import useMongoDB from "../../Utils/useMongoDB";

export default function Pannel(){

    const allFoldersLoad = useSelector(store => store.folder.allFoldersLoad)
    const connected = useSelector(store => store.connection.connected)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const  {mongoDB_getFolder} = useMongoDB()

    // Après la connection, va récupérer la list de tout les dossiers de l'utilisateur connecter
    useEffect(() => {
        if(!allFoldersLoad && userID){
            mongoDB_getFolder()
        }
    }, [userID])

    return(
        
        <div className="pannel_display">
            <div style={!connected ? {display:"none"} : null} className={!onDisconnection ? "pannel_Box apparition" : "pannel_Box disparition" }>

                {allFoldersLoad && ( // Seulement quand tout les dossiers ont été chargé, on charge les autres composants
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