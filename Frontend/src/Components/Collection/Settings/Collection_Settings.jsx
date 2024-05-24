import React, { useRef } from "react";

export default function Collection_Settings(){

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
            {text:"Immediatly", id:"immediatly"},
            {text:"5 minutes", id:"5min"},
        ]},
    ]

    const handleClick = (e) => {
        e.preventDefault()
        const validForm = formRef.current.reportValidity()
        if(validForm){
            console.log(`Envoi du formulaire (${validForm})`)
        }else{
            console.error(`Formulaire incorrecte (${validForm})`)
        }
    }

    return(
        <div className="collectionSettings_Display">
            <div className="collectionSettings_Box">
                <div className="settingsAction_Box">
                    <i onClick={handleClick} className="fa-solid fa-trash"></i>
                </div>

                <form ref={formRef} className="settingsAutomation_Box">

                    {settings.map(setting => (
                        <div className="settings_Box">
                            <div className="question">{setting.question}</div>
                            <div className="settings">
                                {setting.propositions.map(proposition => (
                                    <div className="setting">
                                        <input required id={proposition.id} name={setting.question} type="radio"/>
                                        <label htmlFor={proposition.id}>{proposition.text}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                </form>
            </div>
        </div>
    )
}