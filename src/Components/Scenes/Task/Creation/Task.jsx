import React, { useRef, useState } from "react";
import useTask_Creation from "./useTask";

export default function Creation_Task(){

    
    const {
        textareaRef,
        titleRef,
        handleSubmit,
        handleRadioChange,
        texteareDisabled
    } = useTask_Creation()

    

    return(
        <div className="creationTask_Display">
            <div className="creationTask_Box">
                <form onSubmit={handleSubmit} action="">

                    <div className="section">
                        <label htmlFor="title">Title :</label>
                        <input autoFocus ref={titleRef} type="text" id="title" />
                    </div>

                    <div className="section">
                        <label htmlFor="addDescription">Add description :</label>
                        <div className="radioBox">
                            <div>
                                <input onChange={handleRadioChange} id="addDescription" checked={texteareDisabled === true} type="radio" name="description" value={true}/>
                                <span>No</span>
                            </div>
                            <div>
                                <input onChange={handleRadioChange}  id="addDescription" checked={texteareDisabled === false} type="radio" name="description" value={false}/>
                                <span>Yes</span>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <label htmlFor="content">Description :</label>
                        <textarea required={!texteareDisabled} ref={textareaRef} disabled={texteareDisabled} id="content" cols="30" rows="10"></textarea>
                    </div>

                    <div className="section">
                        <input type="submit" value={"Save"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}