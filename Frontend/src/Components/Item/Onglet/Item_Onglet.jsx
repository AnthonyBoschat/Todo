import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_tabSelected } from "../ItemSlice";

export default function Item_Onglet(){

    const tabsList = useSelector(store => store.item.tabs.tabsList)
    const tabSelected = useSelector(store => store.item.tabs.tabSelected)
    const dispatch = useDispatch()


    return(
        <>
            {tabsList.map((tab, index) => (
                <button key={index} onClick={() => dispatch(update_tabSelected(tab))} className={`itemOnglet ${tab === tabSelected ? "active" : "inactive"}`}>{tab}</button>
            ))}
            <div className="remp"></div>
        </>
    )
}