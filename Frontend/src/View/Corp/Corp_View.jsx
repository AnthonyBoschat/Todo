import React from "react";
import { useSelector } from "react-redux";
import Item_View from "../Item/Item_View";
import Collection_View from "../Collection/Collection_View";
import Indicator_Folder from "../../Components/Folder/Indicator/Folder_Indicator";


export default function Corp_Layout(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)

    return(
        <div className={`renderDisplay ${onDisconnection ? "disparition" : "apparition"}`}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="ItemRender_Display">
                        <div className="header_Display">
                            <Indicator_Folder/>
                        </div>
                        <div className="Items_Lists_Box">
                            <Item_View/>
                            <Collection_View/>
                        </div>
                </div>
            )}
            
        </div>
    )
}