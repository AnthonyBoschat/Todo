import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function Collection_Settings(){

    const collectionSelected = useSelector(store => store.collection.settings.collectionSelected)
    const {fetchRequest} = useFetchRequest()
    const formRef = useRef()


    const settings = [
        {question:"When", propositions:[
            {text:"Click on the button", id:"click"},
            {text:"Add into the collection", id:"add"},
        ]},
        {question:"What", propositions:[
            {text:"Move item", id:"moveItem"},
            {text:"Delete item", id:"deleteItem"},
        ]},
        {question:"In", propositions:[
            {text:"Immediatly", id:0.1},
            {text:"2 minutes", id:120},
        ]},
    ]

    const collectionSettings = {
        when:null,
        what:null,
        in:null
    }

    const handleClick = (e) => {
        e.preventDefault()
        const validForm = formRef.current.reportValidity()
        if(validForm){
            console.log(`Envoi du formulaire (${validForm})`)
            console.log(collectionSettings)
            fetchRequest("POST", `collection_automation/set/${collectionSelected._id}`, collectionSettings)
        }else{
            console.error(`Formulaire incorrecte (${validForm})`)
        }
    }

    const modifySettings = (propositionID, question) => {
        const normalizeQuestion = question.toLowerCase()
        collectionSettings[normalizeQuestion] = propositionID
    }

    const determineDefaultCheckValue = (question) => {
        const normalizeQuestion = question.toLowerCase()
        // console.log(collectionSelected.settings[normalizeQuestion])
        if(!collectionSelected.settings){
            return false
        }else{
            return collectionSelected.settings[normalizeQuestion]
        }
    }

    return(
        <div className={`collectionSettings_Display`}>
            <div className="collectionSettings_Box">
                {collectionSelected && (
                    <>
                        <div className="settingsAction_Box">
                            <i onClick={handleClick} className="fa-solid fa-floppy-disk"></i>
                        </div>

                        <form ref={formRef} className="settingsAutomation_Box">

                            {settings.map((setting, index) => (
                                <div key={index} className="settings_Box">
                                    <div className="question">{setting.question}</div>
                                    <div className="settings">
                                        {setting.propositions.map((proposition, index) => (
                                            <div key={index} className="setting">
                                                <input defaultChecked={determineDefaultCheckValue(setting.question)} onClick={() => modifySettings(proposition.id, setting.question)} required id={proposition.id} name={setting.question} type="radio"/>
                                                <label htmlFor={proposition.id}>{proposition.text}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}