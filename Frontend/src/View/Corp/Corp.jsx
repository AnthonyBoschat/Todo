import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Items from "../Items/Items";
import Lists from "../Lists/Lists";


export default function Corp(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)

    

    



    return(
        <div className={`renderDisplay ${onDisconnection ? "disparition" : "apparition"}`}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="taskRender_Display">
                        <Header/>
                        <div className="Items_Lists_Box">
                            <Items/>
                            <Lists/>
                        </div>
                </div>
            )}
            
        </div>
    )
}