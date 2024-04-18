import React from "react";
import { useSelector } from "react-redux";
import Item_Layout from "../Item/Item_View";
import Lists from "../List/List_View";
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
                            <Item_Layout/>
                            <Lists/>
                        </div>
                </div>
            )}
            
        </div>
    )
}