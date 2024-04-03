import React from "react";
import Indicator_Folder from "../../Components/Folder/Indicator/Indicator_Folder";
import Add_Task from "../../Components/Task/Add/Add_Task";

export default function Header(){

    return(
        <div className="header_Display">
            <Indicator_Folder/>
            <Add_Task/>
        </div>
    )
}