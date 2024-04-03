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