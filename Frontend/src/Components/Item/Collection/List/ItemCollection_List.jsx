import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ItemCollection_One from "../One/ItemCollection_One";
import useFetchRequest from "../../../../Utils/useFetchRequest";
import { useDispatch } from "react-redux";
import { update_reorderItemsToCollection } from "../../../User/UserSlice";

export default function ItemCollection_List({collection, collectionState}){

    const  {collectionVisible} = collectionState
    const [itemToTheCollectionSort, setItemToTheCollectionSort] = useState([])
    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()

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


    const handleDragEnd = (result) => {
        const {source,destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return
        // console.log(itemToTheCollectionSort)
        const itemsCollections = Array.from(itemToTheCollectionSort)
        const [reorderedCollection] = itemsCollections.splice(result.source.index, 1)
        itemsCollections.splice(destination.index, 0, reorderedCollection)
        setItemToTheCollectionSort(itemsCollections)

        // dispatch(update_reorderItemsToCollection({collectionID:collection._id, itemsCollections:itemsCollections}))
        fetchRequest("POST", `collection/sortItems`, {newSortOfItems:itemsCollections, collectionID:collection._id})
    }

    return(
        
        <div className={`itemCollectionList_Display ${collectionVisible ? "visible" : "hidden"}`}>
                {collectionVisible && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId={collection._id}>
                            {(provided) => (
                                <div className="itemCollectionList_Box" {...provided.droppableProps} ref={provided.innerRef} >

                                    <div className="collectionActions">
                                        <i onClick={deleteCollection} className="fa-solid fa-trash"></i>
                                    </div>


                                    {itemToTheCollectionSort.length !== 0 && (
                                        itemToTheCollectionSort.map((item, index) => (
                                                <ItemCollection_One
                                                    key={item[0]}
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
                    </DragDropContext>
                )}
            </div>
    )
}