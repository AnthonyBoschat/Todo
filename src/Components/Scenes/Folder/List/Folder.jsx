import React, {useRef} from "react";
import { useSelector } from "react-redux";
import useListFolder from "./useFolder";
import Button_Folder from "../Buttons/Folder";

export default function List_Folder(){

    const folders = useSelector(store => store.folder.list)
    const inputRef = useRef()

    const {folderOnCreation} = useListFolder(inputRef)
    

    


    return(
        <div className="listFolder_Display">
            <ul className="listFolder_Box">
                {folders.map((folder, index) => (
                    <Button_Folder folder={folder} key={index}/>
                ))}
                {folderOnCreation && (
                    <li className="folderOnCreation_Box">
                        <input ref={inputRef} autoFocus type="text"/>
                    </li>
                )}
            </ul>
        </div>
    )
}