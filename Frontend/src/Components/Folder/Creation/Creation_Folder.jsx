import React from "react";
import useFolder_Creation from "./useCreation_Folder";

export default function Creation_Folder(){

    const {inputRef} = useFolder_Creation()

    return(
        <li className="folderOnCreation_Box">
            <input ref={inputRef} autoFocus type="text"/>
        </li>
    )
}