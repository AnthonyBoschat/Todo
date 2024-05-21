import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_collectionToShow } from "../CollectionSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useCollection_List(){

    const dispatch = useDispatch()
    const userCollectionsList = useSelector(store => store.user.datas.userCollectionsList)
    const collectionOnCreation = useSelector(store => store.collection.collectionOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const collectionToShow = useSelector(store => store.collection.collectionToShow)
    const {fetchRequest} = useFetchRequest()

    useEffect(() => {
        if(folderSelectedID){
            const collectionToShow = userCollectionsList.filter(list => list.folderID === folderSelectedID)
            const collectionToShowSort = collectionToShow.sort((a,b) => a.position - b.position)
            dispatch(update_collectionToShow(collectionToShowSort))
        }
    }, [folderSelectedID, userCollectionsList])

    const dragEndCollections = async(result) => {
        const {source, destination} = result
        console.log("source", source)
        console.log("destination",destination)
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return
        if(destination.droppableId === "Collections" && source.droppableId === "Collections"){
            const collections = Array.from(collectionToShow)
            const [reorderedCollection] = collections.splice(result.source.index, 1)
            collections.splice(destination.index, 0, reorderedCollection)
            dispatch(update_collectionToShow(collections))
            fetchRequest("POST", `collection/sort`, {newCollectionsList:collections})
        }

    }


    return{
        collectionOnCreation,
        collectionToShow,
        dragEndCollections
    }
}