import React from "react";
import useFolder_Creation from "./useFolder_Creation";

export default function Folder_Creation(){

    const {inputRef} = useFolder_Creation()

    return(
        <li className="folderOnCreation_Box">
            <input ref={inputRef} autoFocus type="text"/>
        </li>
    )
}