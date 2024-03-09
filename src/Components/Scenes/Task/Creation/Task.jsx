import React, { useRef, useState } from "react";
import useLocalStorage from "../../../../Utils/useLocalStorage";
import { useDispatch } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";

export default function Creation_Task(){

    const [texteareDisabled, setTexteareDisabled] = useState(true)
    const dispatch = useDispatch()
    const textareaRef = useRef()
    const titleRef = useRef()
    const {localStorage_saveNewTask} = useLocalStorage()

    const handleRadioChange = (event) => {
        const isDisabled = event.target.value === "true"
        setTexteareDisabled(isDisabled)
        // if(isDisabled){textareaRef.current.value = ""}
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const taskTitle = titleRef.current.value // On récupère le titre de la tâche
        const taskDescription = textareaRef.current.value
        const newTask = {title:taskTitle, description:taskDescription}
        localStorage_saveNewTask(newTask)
        dispatch(update_taskOnCreation(false))
        
    }

    return(
        <div className="creationTask_Display">
            <div className="creationTask_Box">
                <form onSubmit={handleSubmit} action="">

                    <div className="section">
                        <label htmlFor="title">Title :</label>
                        <input required ref={titleRef} type="text" id="title" />
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