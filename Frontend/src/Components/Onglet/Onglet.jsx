import React from "react";
import { useDispatch } from "react-redux";

export default function Onglet(props){

    const tabsList = props.tabsList
    const tabSelected = props.tabSelected
    const handleClick = props.handleClick


    return(
        <>
            {tabsList.map((tab, index) => (
                <button key={index} onClick={() => handleClick(tab)} className={`onglet ${tab === tabSelected ? "active" : "inactive"}`}>{tab}</button>
            ))}
            <div className="remp"></div>
        </>
    )
}