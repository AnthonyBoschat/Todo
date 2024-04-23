import { useDispatch } from "react-redux";
import { update_addData, update_changeData, update_dataList, update_deleteData } from "../User/UserSlice";
import { update_ItemOnCreation, update_addItemToShow } from "./ItemSlice";
import { useSelector } from "react-redux";

export default function useItem_Action(){

    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const dispatch = useDispatch()


    const itemAction = {
        create:(data) => {
            dispatch(update_addData({listName:"userItemsList", newData:data}))
            dispatch(update_addItemToShow(data))
            dispatch(update_ItemOnCreation(false))
        },

        delete:(itemID) => {
            const itemIndex = userItemsList.findIndex(item => item._id === itemID)
            dispatch(update_deleteData({listName:"userItemsList", dataIndex:itemIndex}))
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

        sort:(data) => {
            const objectsDatas = data.reduce((acc, item) => {
                acc[item._id] = item.position
                return acc
            }, {})
            const updatedUserItemsList = userItemsList.map(item => {
                if(objectsDatas[item._id] !== undefined){
                    return {...item, position:objectsDatas[item._id]}
                }
                return item
            })
            dispatch(update_dataList({listName:"userItemsList", newList:updatedUserItemsList}))
            console.log("Requette de réorganisation des tâches effectuer")
        }
    }

    return{
        itemAction
    }
}