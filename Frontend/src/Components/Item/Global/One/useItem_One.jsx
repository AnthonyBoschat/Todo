import {useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../../../Utils/useFetchRequest";
import { update_collectionWhoWhantItems } from "../../../Collection/CollectionSlice";

export default function useItem_One(item){

    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()
    const collectionWhoWhantItems = useSelector(store => store.collection.collectionWhoWhantItems)
    const [propertiesVisible, setPropertiesVisible] = useState(false)
    const [canBeManaged, setCanBeManaged] = useState(false)
    const [canBeAdd, setCanBeAdd] = useState(false)
    const [canBeDelete, setCanBeDelete] = useState(false)

    const ItemNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()

    // Lorsque l'utilisateur clique sur un item
    const handleClick = (e) => {
        if(e.target.localName !== "button"){
            // On change la vu des propriété en true ou false
            setPropertiesVisible(!propertiesVisible)
        }
    }

    const addItem = () => {
        const itemToAdd = {
            itemID:item._id,
            collectionID:collectionWhoWhantItems[0]._id,
        }
        fetchRequest("POST", "collection/addItem", itemToAdd)
    }

    useEffect(() => {
        if(collectionWhoWhantItems.length > 0){
            setCanBeManaged(true)
        }else{
            setCanBeManaged(false)
        }
        collectionWhoWhantItems.forEach(collection => {
            if(!collection.items){
                setCanBeAdd(true)
            }
            if(collection.items){
                if(collection.items[item._id]){
                    setCanBeDelete(true)
                    setCanBeAdd(false)
                }else{
                    setCanBeAdd(true)
                    setCanBeDelete(false)
                }
            }
        })
    }, [collectionWhoWhantItems])
    
    return{
        ItemNameRef,
        leftSideRef,
        toggleCoverRef,
        propertiesVisible,
        handleClick,


        canBeManaged,
        canBeAdd,
        canBeDelete,

        addItem
    }
}