import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice";
import useMongoDB from "./useMongoDB";
import { update_allDatasLoad } from "../Components/User/UserSlice";


export default function useUpdate(){

    const allDatasLoad = useSelector(store => store.user.allDatasLoad)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const userFoldersList = useSelector(store => store.user.datas.userFoldersList)
    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const userID = useSelector(store => store.connection.connectedUser._id)

    const dispatch = useDispatch()
    const {mongoDB_getAllData} = useMongoDB()

    // Après la connection, va récupérer toutes les datas de l'utilisateur
    useEffect(() => {
        if(!allDatasLoad && userID){
            mongoDB_getAllData()
        }
    }, [userID])



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Responsable de la mise à jour automatique de l'état folderSelectedName
    useEffect(() => {
        if(folderSelectedID){
            const folderIndex = userFoldersList.findIndex(folder => folder._id === folderSelectedID)
            const folderName = userFoldersList[folderIndex].name
            dispatch(update_folderSelectedName(folderName))
        }else{
            dispatch(update_folderSelectedName(null))
        }
    }, [folderSelectedID])

    return{}
}