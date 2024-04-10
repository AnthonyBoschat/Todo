import { useDispatch } from "react-redux";
import { update_addData, update_changeData, update_deleteData } from "../User/UserSlice";
import { update_taskOnCreation } from "./TaskSlice";
import useFetchRequest from "../../Utils/useFetchRequest";
import { useSelector } from "react-redux";

export default function useTask_Request(){

    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()

    const taskRequest_Create = async(newTask) => {
        try{
            const {ok, data} = await fetchRequest("POST", {
                route: "/task/create",
                body: newTask
            })
            if(ok){
                dispatch(update_addData({listName:"userTasksList", newData:data}))
                dispatch(update_taskOnCreation(false))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la création de la task:", error)
        }
    }



    const taskRequest_Delete = async (taskID) => {
        try{
            const {ok, data} = await fetchRequest("DELETE", {
                route: `/task/delete/${taskID}`,
            })
            if(ok){
                // const dataIndex = userTasksList.findIndex(task => task._id === data._id)
                // dispatch(update_deleteData({listName:"userTasksList", dataIndex:dataIndex}))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la suppression de la task:", error)
        }
    }




    const taskRequest_toggleCompleted = async(taskID, newValue) => {
        try{
            const {ok, data} = await fetchRequest("PUT", {
                route: `/task/toggleCompleted/${taskID}`,
                body:{completed:newValue}
            })
            if(ok){
                const dataIndex = userTasksList.findIndex(task => task._id === data._id)
                dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la modification du toggle completed:", error)
        }
    }




    const taskRequest_toggleOnWorking = async(taskID, newValue) => {
        try{
            const {ok, data} = await fetchRequest("PUT", {
                route: `/task/toggleOnWorking/${taskID}`,
                body:{onWorking:newValue}
            })
            if(ok){
                data.forEach(data => {
                    if(data !== null){
                        const dataIndex = userTasksList.findIndex(task => task._id === data._id)
                        dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
                    }
                })
            }
        }catch(error) {
            console.error("Une erreur est survenue lors de la modification du toggle onWorking:", error)
        }
    }




    const taskRequest_rename = async(taskID, newTaskContent) => {
        try{
            const {ok, data} = await fetchRequest("PUT", {
                route: `/task/rename/${taskID}`,
                body:{newTaskContent}
            })
            if(ok){
                console.log("good")
                const dataIndex = userTasksList.findIndex(task => task._id === data._id)
                dispatch(update_changeData({listName:"userTasksList", dataIndex:dataIndex, newData:data}))
                   
            }
        }catch(error) {
            console.error("Une erreur est survenue lors du renommage de la task:", error)
        }
    }

    return{
        taskRequest_Create,
        taskRequest_Delete,
        taskRequest_toggleCompleted,
        taskRequest_toggleOnWorking,
        taskRequest_rename
    }
}