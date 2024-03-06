import React from "react";
import AddButton_Folder from "../Add_Button/Folder/Folder";
import List_Folder from "../List/Folder/Folder";

export default function Nav(){

    return(
        <div className="navDisplay">
            <AddButton_Folder/>
            <List_Folder/>
        </div>
    )
}