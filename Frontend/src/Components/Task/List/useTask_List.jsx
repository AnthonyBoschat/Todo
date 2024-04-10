import {useRef} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_reorderList } from "../../User/UserSlice";

export default function useTask_List(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation) // Est-ce qu'une task est en train d'etre créé
    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const taskToShow = userTasksList.filter(task => task?.folderID === folderSelectedID)
    const displayTaskListRef = useRef()
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {
        if(!result.destination) return
        const items = Array.from(userTasksList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        dispatch(update_reorderList({listName:"userTasksList", newList:items}))
    }


    return{
        taskOnCreation,
        displayTaskListRef,
        taskToShow,
        handleOnDragEnd
    }
}