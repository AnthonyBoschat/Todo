import React from "react";
import { useSelector } from "react-redux";
import useIndicator_Folder from "./useIndicator_Folder";

export default function Indicator_Folder(){

    const {
        folderInputRef,
        folderInputDisabled,
        folderSelectedName,
        folderName,
        handleChangeInputFolder,
        lockUnlockFolder,
        deleteFolder
    } = useIndicator_Folder()

    return(
        <>
            {folderSelectedName && (
                <div className="folderIndicator_Box">
                    <i onClick={deleteFolder} className="deleteFolder fa-solid fa-trash"></i>
                    <span>/ </span>
                    <input onChange={handleChangeInputFolder} ref={folderInputRef} style={!folderInputDisabled ? {outline:"1px solid white"} : null} disabled={folderInputDisabled} type="text" value={folderName ? folderName : ""} />
                    {folderInputDisabled && (<i onClick={lockUnlockFolder} className="lockFolder fa-solid fa-lock"></i>)}
                    {!folderInputDisabled && (<i onClick={lockUnlockFolder} className="unlockFolder fa-solid fa-unlock"></i>)}
                </div>
            )}
        </>
    )
}