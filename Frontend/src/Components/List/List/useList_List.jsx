import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_listToShow } from "../ListSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useList_List(){

    const dispatch = useDispatch()
    const userListsList = useSelector(store => store.user.datas.userListsList)
    const listOnCreation = useSelector(store => store.list.listOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const listToShow = useSelector(store => store.list.listToShow)
    const {fetchRequest} = useFetchRequest()

    useEffect(() => {
        if(folderSelectedID){
            const listToShow = userListsList.filter(list => list.folderID === folderSelectedID)
            const listToShowSort = listToShow.sort((a,b) => a.position - b.position)
            dispatch(update_listToShow(listToShowSort))
        }
    }, [folderSelectedID, userListsList])

    const handleOnDragEnd = (result) => {
        const {source, destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return

        const lists = Array.from(listToShow)
        const [reorderedList] = lists.splice(result.source.index, 1)
        lists.splice(destination.index, 0, reorderedList)

        dispatch(update_listToShow(lists))
        fetchRequest("POST", `list/sort`, {newListList:lists})
    }

    return{
        listOnCreation,
        listToShow,
        handleOnDragEnd
    }
}