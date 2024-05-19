import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ItemCollection_One from "../One/ItemCollection_One";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function ItemCollection_List({collection, collectionState}){

    const  {collectionVisible} = collectionState
    const [itemToTheCollectionSort, setItemToTheCollectionSort] = useState([])
    const {fetchRequest} = useFetchRequest()
    useEffect(() => {
        if(collection.items){
            const newItemToTheCollectionSort = Object.entries(collection.items).sort((a, b) => a[1].position - b[1].position)
            setItemToTheCollectionSort(newItemToTheCollectionSort)
        }
    }, [collection])

    const deleteCollection = () => {
        const confirm = window.confirm("Delete this collection ?")
        if(confirm){
            fetchRequest("DELETE", `collection/delete/${collection._id}`)
        }
    }

    return(
        <div className={`itemCollectionList_Display ${collectionVisible ? "visible" : "hidden"}`}>
            {collectionVisible && (
                <Droppable droppableId={`collection_${collection._id}`} type="item">
                    {(provided) => (
                        <div className="itemCollectionList_Box" {...provided.droppableProps} ref={provided.innerRef} >

                            <div className="collectionActions">
                                <i onClick={deleteCollection} className="fa-solid fa-trash"></i>
                            </div>


                            {itemToTheCollectionSort.length !== 0 && (
                                itemToTheCollectionSort.map((item, index) => (
                                        <ItemCollection_One
                                            key={index}
                                            item={item}
                                            index={index}
                                            collectionID={collection._id}
                                        />
                                    ))
                            )}
                            {provided.placeholder}

                        </div>
                    )}
                </Droppable>
            )}
        </div>
    )
}