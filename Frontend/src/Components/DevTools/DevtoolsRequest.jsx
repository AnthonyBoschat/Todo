import React, {} from "react";
import useFetchRequest from "../../Utils/useFetchRequest";
import { useDispatch } from "react-redux";
import { update_DELETE_ALL_DATAS, update_allDatasLoad, update_dataList } from "../User/UserSlice";
import { update_folderSelectedID } from "../Folder/FolderSlice";
import { update_closeConnection } from "../Connection/ConnectionSlice";

export default function useDevtoolsRequest(){

    const dispatch = useDispatch()

    const devtoolAction = {
        DELETE_ALL_ItemS:(data) => {
            dispatch(update_dataList({listName:"userItemsList", newList:data}))
        },
        DELETE_ALL_FOLDERS:() => {
            dispatch(update_DELETE_ALL_DATAS())
            dispatch(update_folderSelectedID(null))
        },
        DELETE_ALL_USERS:() => {
            dispatch(update_DELETE_ALL_DATAS())
                dispatch(update_folderSelectedID(null))
                dispatch(update_allDatasLoad(false))
            dispatch(update_closeConnection())
        },
        DELETE_THIS_USER:() => {
            dispatch(update_DELETE_ALL_DATAS())
            dispatch(update_folderSelectedID(null))
            dispatch(update_allDatasLoad(false))
            dispatch(update_closeConnection())
        },

    }

    return{
        devtoolAction
    }
}