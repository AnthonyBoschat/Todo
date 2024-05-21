import React from "react";
import Collection_Add from "../../Components/Collection/Add/Collection_Add"
import Collection_List from "../../Components/Collection/List/Collection_List";
import { useDispatch, useSelector } from "react-redux";
import { update_tabSelectedCollection } from "../../Components/Collection/CollectionSlice";

export default function Collection_View(){

    const {tabsList, tabSelected} = useSelector(store => store.collection.tabs)
    const dispatch = useDispatch()

    return(
        <div className="collections_Display">
            <div className="collectionsOnglet_Box">
                {tabsList.map((tab, index) => (
                    <button onClick={() => dispatch(update_tabSelectedCollection(tab))} className={`itemOnglet ${tab === tabSelected ? "active" : "inactive"}`} key={index}>{tab}</button>
                ))}
                <div className="remp"></div>
            </div>
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