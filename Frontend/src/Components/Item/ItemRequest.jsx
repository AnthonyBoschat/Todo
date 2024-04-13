import { useDispatch } from "react-redux";
import { update_addData, update_changeData, update_deleteData } from "../User/UserSlice";
import { update_ItemOnCreation } from "./ItemSlice";
import { useSelector } from "react-redux";

export default function useItem_Request(){

    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const dispatch = useDispatch()


    const ItemAction = {
        create:(data) => {
            dispatch(update_addData({listName:"userItemsList", newData:data}))
            dispatch(update_ItemOnCreation(false))
        },

        delete:(data) => {
            const dataIndex = userItemsList.findIndex(Item => Item._id === data._id)
            dispatch(update_deleteData({listName:"userItemsList", dataIndex:dataIndex}))
        },

        toggleCompleted:(data) => {
            const dataIndex = userItemsList.findIndex(Item => Item._id === data._id)
            dispatch(update_changeData({listName:"userItemsList", dataIndex:dataIndex, newData:data}))
        },

        toggleOnWorking:(data) => {
            data.forEach(data => {
                if(data !== null){
                    const dataIndex = userItemsList.findIndex(Item => Item._id === data._id)
                    dispatch(update_changeData({listName:"userItemsList", dataIndex:dataIndex, newData:data}))
                }
            })
        },

        rename:(data) => {
            const dataIndex = userItemsList.findIndex(Item => Item._id === data._id)
            dispatch(update_changeData({listName:"userItemsList", dataIndex:dataIndex, newData:data}))
        },

        sort:() => {
            console.log("Requette de réorganisation des tâches effectuer")
        }
    }

    return{
        ItemAction
    }
}