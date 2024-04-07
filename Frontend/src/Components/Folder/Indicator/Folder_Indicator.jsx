import React from "react";
import useFolder_Indicator from "./useFolder_Indicator";

export default function Folder_Indicator(){

    const {
        folderInputRef,
        folderInputDisabled,
        folderSelectedName,
        folderName,
        handleChangeInputFolder,
        lockUnlockFolder,
        deleteFolder
    } = useFolder_Indicator()

    return(
        <>
            {folderSelectedName && (
                <div className="folderIndicator_Box">
                    
                    <input className={folderInputDisabled ? null : "inputDisabled"} onChange={handleChangeInputFolder} ref={folderInputRef} disabled={folderInputDisabled} type="text" value={folderName ? folderName : ""} />
                    <i onClick={lockUnlockFolder} className={folderInputDisabled ? "lockFolder fa-solid fa-lock" : "unlockFolder fa-solid fa-unlock"}></i>
                    <i onClick={deleteFolder} className="deleteFolder fa-solid fa-trash"></i>
                </div>
            )}
        </>
    )
}