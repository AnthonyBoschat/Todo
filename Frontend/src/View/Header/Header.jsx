import React from "react";
import Indicator_Folder from "../../Components/Folder/Indicator/Folder_Indicator";
import Add_Task from "../../Components/Task/Add/Task_Add";
import Trash from "../../Components/Trash/Trash";

export default function Header(){

    return(
        <div className="header_Display">
            <Indicator_Folder/>
            <Add_Task/>

            {/* <Trash/> */}
            
        </div>
    )
}