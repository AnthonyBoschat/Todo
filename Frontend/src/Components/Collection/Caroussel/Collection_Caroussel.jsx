import React from "react";
import { useSelector } from "react-redux";

export default function Collection_Caroussel(){

    const collectionToShow = useSelector(store => store.collection.collectionToShow)


    return(
        <div className="collectionCaroussel_Display">
            <div className="collectionCaroussel_Box">
                {collectionToShow.map((collection, index) => (
                    <div key={index} className="collection">{collection.name}</div>
                ))}
            </div>
        </div>
    )
}