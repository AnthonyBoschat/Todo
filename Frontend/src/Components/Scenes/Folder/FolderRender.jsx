import React from "react";
import Add_Folder from "./Add/Folder";
import List_Folder from "./List/Folder";

export default function FolderRender(){

    return(
        <div className="folderRender_display">
            <Add_Folder/>
            <List_Folder/>
        </div>
    )
}