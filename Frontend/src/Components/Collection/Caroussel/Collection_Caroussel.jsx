import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_settingsCollectionSelected } from "../CollectionSlice";

export default function Collection_Caroussel(){

    const collectionToShow = useSelector(store => store.collection.collectionToShow)
    const settingsCollectionSelected = useSelector(store => store.collection.settings.collectionSelected)
    const dispatch = useDispatch()

    const handleClick = (collection) => {
        if(settingsCollectionSelected){
            if(settingsCollectionSelected._id === collection._id){
                dispatch(update_settingsCollectionSelected(null))
                return
            }
        }
        dispatch(update_settingsCollectionSelected(collection))
    }

    return(
        <div className="collectionCaroussel_Display">
            <div className="collectionCaroussel_Box">
                {collectionToShow.map((collection, index) => (
                    <div 
                        onClick={() => handleClick(collection)} 
                        key={index} 
                        className={`collection ${collection._id === settingsCollectionSelected ? "selected" : null}`}>{collection.name}</div>
                ))}
            </div>
        </div>
    )
}