import React from "react";
import useFolder_Creation from "./useFolder_Creation";

export default function Folder_Creation(){

    const {
        autoResize,
        folderCreationRef
    } = useFolder_Creation()

    return(
        <li className="folderOnCreation_Box">
            <div aria-label="newFolderCreation" contentEditable onInput={autoResize} ref={folderCreationRef} autoFocus></div>
        </li>
    )
}