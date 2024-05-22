import React from "react";
import Collection_Add from "../../Components/Collection/Add/Collection_Add"
import Collection_List from "../../Components/Collection/List/Collection_List";
import { useDispatch, useSelector } from "react-redux";
import Onglet from "../../Components/Onglet/Onglet";
import { update_tabSelectedCollection } from "../../Components/Collection/CollectionSlice";

export default function Collection_View(){

    const {tabSelected, tabsList} = useSelector(store => store.collection.tabs)
    const dispatch = useDispatch()

    return(
        <div className="collections_Display">


            {/* Onglets */}
            <div className="collectionsOnglet_Box">
                <Onglet
                    tabsList={tabsList}
                    tabSelected={tabSelected}
                    handleClick={(tab) => dispatch(update_tabSelectedCollection(tab)) }
                />
            </div>

            {/* Contenu principal */}
            <div className="collections_Box">
                
                {tabSelected === "Collections" && (
                    <>
                        <Collection_Add/>
                        <Collection_List/>
                    </>
                )}
                {tabSelected === "Automations" && (
                    <>
                        <h1>Automation tab</h1>
                    </>
                )}
                
            </div>
        </div>
    )
}