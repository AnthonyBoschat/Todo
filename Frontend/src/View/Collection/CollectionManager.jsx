import React, { useEffect } from "react";
import { update_collectionToShow } from "../../Components/Collection/CollectionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CollectionManager(){

    const userCollectionsList = useSelector(store => store.user.datas.userCollectionsList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const dispatch = useDispatch()

    useEffect(() => {
        if(folderSelectedID){
            const collectionToShow = userCollectionsList.filter(list => list.folderID === folderSelectedID)
            const collectionToShowSort = collectionToShow.sort((a,b) => a.position - b.position)
            dispatch(update_collectionToShow(collectionToShowSort))
        }
    }, [folderSelectedID, userCollectionsList])

    return{}
}