import React, { useEffect } from "react";
import Item_List from "../../Components/Item/Global/List/Item_List";
import Item_Add from "../../Components/Item/Global/Add/Item_Add";
import Property_Global_List from "../../Components/Property/Global/List/Property_Global_List";
import Property_Global_Add from "../../Components/Property/Global/Add/Property_Global_Add";
import { useDispatch, useSelector } from "react-redux";
import { update_itemToShow, update_tabSelectedItem } from "../../Components/Item/ItemSlice";
import Onglet from "../../Components/Onglet/Onglet";
import { update_propertyOnCreation, update_propertyToShow } from "../../Components/Property/PropertySlice";


export default function Item_View({cloneID, cloneStyle}){

    const {tabSelected, tabsList} = useSelector(store => store.item.global.tabs)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const userPropertyList = useSelector(store => store.user.datas.userPropertyList)
    const propertyToShow = useSelector(store => store.property.propertyToShow)
    const dispatch = useDispatch()


    // Met à jour la liste des items à afficher quand la liste des items change, ou que le dossier selectionner change
    useEffect(() => {
        const newItemsToShow = userItemsList.filter(item => item.folderID === folderSelectedID) // newItemsToShow = les Items correspond à ce dossier
        const newItemsToShowSort = newItemsToShow.sort((a,b) => a.position - b.position) // newItemsToShowSort = Ces items trier selon l'ordre des positions
        dispatch(update_itemToShow(newItemsToShowSort)) // Met à jour la liste des items à afficher
    }, [userItemsList, folderSelectedID])

    // Met à jour la liste des propriété à afficher quand la liste des propriété change ou que le dossier selectionner change
    useEffect(() => {
        dispatch(update_propertyOnCreation(false)) // On annule le mode création d'une propriété
        const newPropertyToShow = userPropertyList.filter(property => property.folderID === folderSelectedID) // newPropertyToShow = La liste des propriété associé à ce dossier
        dispatch(update_propertyToShow(newPropertyToShow)) // Met à jour la liste des propriété à afficher
    }, [folderSelectedID, userPropertyList])




    return(
        <div className="Items_Display">

            {/*Onglet*/}
            <div className="ongletBox">
                <Onglet
                    tabsList={tabsList}
                    tabSelected={tabSelected}
                    handleClick={(tab) => dispatch(update_tabSelectedItem(tab))}
                />
            </div>


            {/*Contenu principal*/}
            <div className="Items_Box">

                {/*Ajouter un élément*/}
                <div className="add_Box">
                    {(tabSelected === "Items") && (<Item_Add/>)}
                    {(tabSelected === "Property") && (<Property_Global_Add/>)}
                </div>
                {/*List des éléments*/}
                <div className="list_Box">
                    {(tabSelected === "Items") && (<Item_List cloneID={cloneID} cloneStyle={cloneStyle}/>)}
                    {(tabSelected === "Property") && (<Property_Global_List propertyToShow={propertyToShow}/>)}
                </div>
            </div>
        </div>
    )
}