import React from "react";
import useHeaderTask from "./useTask";

export default function Header_Task(){

    

    const {
        addTask, 
        deleteFolder, 
        folderInputRef,
        folderInputDisabled,
        lockUnlockFolder,
        folderName,
        handleChangeInputFolder
    } = useHeaderTask()
    
    return(
        
        <div className="addTask_Display">

            {folderName && (
                <div className="folderIndicator_Box">
                    <i onClick={deleteFolder} className="deleteFolder fa-solid fa-trash"></i>
                    <span>/ </span>
                    <input onChange={handleChangeInputFolder} ref={folderInputRef} style={!folderInputDisabled ? {outline:"1px solid white"} : null} disabled={folderInputDisabled} type="text" value={folderName} />
                    {folderInputDisabled && (<i onClick={lockUnlockFolder} className="lockFolder fa-solid fa-lock"></i>)}
                    {!folderInputDisabled && (<i onClick={lockUnlockFolder} className="unlockFolder fa-solid fa-unlock"></i>)}
                </div>
            )}

            <div onClick={addTask} className="addTask_Box">
                <i className="fa-solid fa-plus"></i>
                <span >Add Task</span>
            </div>

            
        </div>
    )
}