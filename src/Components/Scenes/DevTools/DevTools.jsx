import React from "react";
import { useDispatch } from "react-redux";
import { update_RESET_FOLDERS_SLICE } from "../Folder/FolderSlice";

export default function DevTools(){
    const dispatch = useDispatch()

    const deleteAllData = () => {
        localStorage.removeItem("todoStorage")
        dispatch(update_RESET_FOLDERS_SLICE())
    }

    return(
        <div className="devtools_Box">
            <button onClick={deleteAllData}>Delete All Data</button>
        </div>
    )
}