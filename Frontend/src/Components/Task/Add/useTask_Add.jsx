import React, {} from "react";
import { useDispatch } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import { useSelector } from "react-redux";

export default function useTask_Add(){

    const dispatch = useDispatch()
    const taskOnCreation = useSelector(store => store.task.taskOnCreation)

    const addTask = () => {
        dispatch(update_taskOnCreation(!taskOnCreation))
    }

    return{
        addTask
    }
}