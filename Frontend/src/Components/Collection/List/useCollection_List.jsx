import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_collectionToShow } from "../CollectionSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useCollection_List(){

    const dispatch = useDispatch()
    const collectionOnCreation = useSelector(store => store.collection.collectionOnCreation)
    const collectionToShow = useSelector(store => store.collection.collectionToShow)
    const {fetchRequest} = useFetchRequest()

    const dragEndCollections = async(result) => {
        const {source, destination} = result
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