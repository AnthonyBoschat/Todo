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

    useEffect(() => {
        if(folderSelectedID){
            const collectionToShow = userCollectionsList.filter(list => list.folderID === folderSelectedID)
            const collectionToShowSort = collectionToShow.sort((a,b) => a.position - b.position)
            dispatch(update_collectionToShow(collectionToShowSort))
        }
    }, [folderSelectedID, userCollectionsList])


    return{
        collectionOnCreation,
        collectionToShow,
    }
}