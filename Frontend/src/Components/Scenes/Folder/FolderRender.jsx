import React from "react";
import Add_Folder from "./Add/Folder";
import List_Folder from "./List/Folder";
import User from "../User/User";
import { useSelector } from "react-redux";

export default function FolderRender(){

    
    const connected = useSelector(store => store.connection.connected)
    
    return(
        <div className="folderRender_display">
            <div style={!connected ? {display:"none"} : null} className="folderRender_Box">
                <Add_Folder/>
                <List_Folder/>
                <User/>
            </div>
        </div>
    )
}