import {useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../../../Utils/useFetchRequest";
import { update_collectionWhoWhantItems } from "../../../Collection/CollectionSlice";

export default function useItem_One(item){

    const {fetchRequest} = useFetchRequest()
    const dispatch = useDispatch()
    const collectionWhoWhantItems = useSelector(store => store.collection.collectionWhoWhantItems)
    const userCollectionsList = useSelector(store => store.user.datas.userCollectionsList)
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
        // setCanBeAdd(false)
        const itemToAdd = {
            itemID:item._id,
            collectionsID:collectionWhoWhantItems,
        }
        fetchRequest("POST", "collection/addItem", itemToAdd)
    }

    const deleteItem = () => {
        // setCanBeDelete(false)
        const itemToDelete = {
            itemID:item._id,
            collectionsID:collectionWhoWhantItems
        }
        fetchRequest("DELETE", `collection/deleteItemGlobal/${item._id}/${collectionWhoWhantItems}`)
    }

    useEffect(() => {
        console.log("0")
        if(collectionWhoWhantItems.length > 0){
            setCanBeManaged(true)
        }else{
            setCanBeManaged(false)
        }
        const collectionList = []
        collectionWhoWhantItems.map(collectionID => {
            userCollectionsList.forEach(collection => {
                if(collection._id === collectionID){
                    collectionList.push(collection)
                }
            })
        })
        const manager = {
            totalLength:collectionList.length,
            haveThisItem:0,
            notHaveThisItem:0,
        }
        collectionList.forEach(collection => {
            if(!collection.items){
                manager.notHaveThisItem += 1
            }else{
                if(collection.items[item._id]){
                    manager.haveThisItem += 1
                }else{
                    manager.notHaveThisItem += 1
                }
            }
        })

        if(manager.haveThisItem === manager.totalLength){
            setCanBeDelete(true)
            setCanBeAdd(false)
            return
        }
        if(manager.notHaveThisItem === manager.totalLength){
            setCanBeAdd(true)
            setCanBeDelete(false)
            return
        }
        
        if(manager.haveThisItem>0){setCanBeDelete(true)}
        if(manager.notHaveThisItem>0){setCanBeAdd(true)}
    }, [collectionWhoWhantItems, userCollectionsList])
    
    return{
        ItemNameRef,
        leftSideRef,
        toggleCoverRef,
        propertiesVisible,
        handleClick,


        canBeManaged,
        canBeAdd,
        canBeDelete,

        addItem,
        deleteItem
    }
}