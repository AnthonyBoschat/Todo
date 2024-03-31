import { useSelector } from "react-redux"


export default function useDictionnary(){

    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const userTasksList = useSelector(store => store.user.datas.userTasksList)



    const dataListDictionary = {
        userFoldersList:userFoldersList,
        userTasksList:userTasksList,
    }








    return{
        dataListDictionary
    }
}