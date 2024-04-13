import React, { useState } from "react";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useTaskOption_Delete(task){

    const {fetchRequest} = useFetchRequest()

    const handleClick = () => {
        const confirmation = window.confirm("Delete this task ?")
        if(confirmation){
            const taskID = task._id
            fetchRequest("DELETE", `task/delete/${taskID}`)
        }
    }


    return{
        handleClick,
    }
}