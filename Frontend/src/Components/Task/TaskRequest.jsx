import { useDispatch } from "react-redux";
import { update_addData, update_changeData, update_deleteData } from "../User/UserSlice";
import { update_taskOnCreation } from "./TaskSlice";
import { useSelector } from "react-redux";

export default function useTask_Request(){

    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const dispatch = useDispatch()


    const taskAction = {
        create:(data) => {
            dispatch(update_addData({listName:"userTasksList", newData:data}))
            dispatch(update_taskOnCreation(false))
        },

        delete:(data) => {
            const dataIndex = userTasksList.findIndex(task => task._id === data._id)
            dispatch(update_deleteData({listName:"userTasksList", dataIndex:dataIndex}))
        },

        toggleCompleted:(data) => {
            const dataIndex = userTasksList.findIndex(task => task._id === data._id)
            dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
        },

        toggleOnWorking:(data) => {
            data.forEach(data => {
                if(data !== null){
                    const dataIndex = userTasksList.findIndex(task => task._id === data._id)
                    dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
                }
            })
        },

        rename:(data) => {
            const dataIndex = userTasksList.findIndex(task => task._id === data._id)
            dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
        },

        sort:() => {
            console.log("Requette de réorganisation des tâches effectuer")
        }
    }

    return{
        taskAction
    }
}