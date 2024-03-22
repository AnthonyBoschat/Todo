import React from "react";
import Add_Folder from "./Add/Folder";
import List_Folder from "./List/Folder";
import User from "../User/User";

export default function FolderRender(){

    return(
        <div className="folderRender_display">
            <Add_Folder/>
            <List_Folder/>
            <User/>
        </div>
    )
}