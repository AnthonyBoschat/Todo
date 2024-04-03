export default function useErrorAction(){

    

    const errorAction = (route, payload) => {
        switch(route){
            
            case "/users/create":
                break
            
            case "/users/connect":
                break

            default:
                return
        }
    }

    return{
        errorAction
    }
}