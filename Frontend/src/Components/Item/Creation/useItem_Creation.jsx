import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useItem_Request from "../ItemRequest";
import { update_ItemOnCreation } from "../ItemSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useItem_Creation(){

    const ItemOnCreation = useSelector(store => store.item.ItemOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const dispatch = useDispatch()
    
    const {ItemRequest_Create} = useItem_Request()
    const {fetchRequest} = useFetchRequest()
    const ItemCreationRef = useRef()


    // Prépare la sauvegarde dans le mongoDB de la nouvelle tâche
    const saveNewItem = () => {
        const ItemTitle = ItemCreationRef.current.innerText
        const newItem = {
            content:ItemTitle, 
            completed:false,
            folderID:folderSelectedID
        }
        fetchRequest("POST", "Item/create", newItem)
    }

    // Validation de la Item par le click en dehors, si le nom est rempli au moin
    const handleValidItemKeydownClick = useCallback(() => {
        if(ItemCreationRef.current.innerHTML !== ""){
            saveNewItem()
        }else{
            dispatch(update_ItemOnCreation(false))
        }
    }, [])


    // Validation de la Item par la touche entrée, si le nom est rempli au moin
    const handleValidItemKeydown = useCallback( async(event) => {
        if(event.key === "Enter"){
            if(!event.shiftKey){
                if(ItemCreationRef.current.innerHTML !== ""){
                    event.preventDefault()
                    saveNewItem()
                }else{
                    dispatch(update_ItemOnCreation(false))
                }
            }
        }
    }, [])

    
    // Quand une nouvelle Item souhaite etre créé, on met le focus dessus
    useEffect(() => { 
        if(ItemOnCreation && ItemCreationRef.current){
            ItemCreationRef.current.focus()
        }
    }, [ItemOnCreation])

    // Gestion des deux listener, sur le clique outside et le keypressEnter pour la validation ou l'annulation de la Item
    useEffect(() => { 
        if(ItemCreationRef.current && ItemOnCreation){

            ItemCreationRef.current.addEventListener("keydown", handleValidItemKeydown)
            setTimeout(() => {window.addEventListener("click", handleValidItemKeydownClick)}, 1);

            return () => {
                window.removeEventListener("click", handleValidItemKeydownClick)
                if(ItemCreationRef.current){
                    ItemCreationRef.current.removeEventListener("keydown", handleValidItemKeydown)
                }
            }
        }
    }, [ItemOnCreation])

    return{
        ItemCreationRef,
    }
}