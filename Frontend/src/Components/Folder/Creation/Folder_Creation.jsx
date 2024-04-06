import React from "react";
import useFolder_Creation from "./useFolder_Creation";

export default function Folder_Creation(){

    const {
        autoResize,
        textareaRef
    } = useFolder_Creation()

    return(
        <li className="folderOnCreation_Box">
            <textarea onInput={autoResize} ref={textareaRef} autoFocus/>
        </li>
    )
}