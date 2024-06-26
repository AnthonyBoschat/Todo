import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_ItemOnCreation } from "../../ItemSlice";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useItem_Creation(){

    const ItemOnCreation = useSelector(store => store.item.global.itemOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const dispatch = useDispatch()
    
    const {fetchRequest} = useFetchRequest()
    const ItemCreationRef = useRef()


    // Prépare la sauvegarde dans le mongoDB de la nouvelle tâche

    // Validation de la Item par le click en dehors, si le nom est rempli au moin
    const handleValidItemKeydownClick = useCallback((event) => {
        if(event.target === ItemCreationRef.current){
            event.preventDefault()
            return
        }
        if(ItemCreationRef.current.innerHTML !== ""){
            const newItem = {
                content:ItemCreationRef.current.innerText, 
                completed:false,
                folderID:folderSelectedID
            }
            fetchRequest("POST", "item/create", newItem)
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
                    const newItem = {
                        content:ItemCreationRef.current.innerText, 
                        completed:false,
                        folderID:folderSelectedID
                    }
                    fetchRequest("POST", "item/create", newItem)
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