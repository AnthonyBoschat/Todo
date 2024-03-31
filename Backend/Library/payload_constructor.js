const library_target = require("./target")
const library_sideEffect = require("./sideEffect")



const payload_contructor = ({finalAction, target = null, data=null}) => {
    const payload = {
        finalAction:finalAction
    }
    if(data){
        payload.data = data
    }
    if(target && library_target[target]){
        payload.target = library_target[target]
    }
    if(target && library_sideEffect[`${finalAction}_${target}`]){
        payload.sideEffect = library_sideEffect[`${finalAction}_${target}`]
    }
    return payload
}

module.exports = payload_contructor