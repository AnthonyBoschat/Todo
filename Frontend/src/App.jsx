import { useSelector } from "react-redux";
import DevTools from "./Components/DevTools/DevTools";
import Pannel from "./View/Pannel/Pannel";
import Corp from "./View/Corp/Corp";
import "./Css/main.css"
import Popup from "./Components/Popup/Popup";
import { useEffect, useState } from "react";
import useUser_Request from "./Components/User/UserRequest";
import Connection from "./View/Connection/Connection";

function App() {

  const connected = useSelector(store => store.connection.connected)
  const userID = useSelector(store => store.connection.connectedUser._id)
  const allDatasLoad = useSelector(store => store.user.allDatasLoad)
  const [reconnectionControle, setReconnectionControle] = useState(false)
  const {userRequest_Reconnect, userRequest_LoadDatas} = useUser_Request()
  
  // Tentative de reconnection par le cookie
  useEffect(() => {
    (async () => {
      await userRequest_Reconnect()
      setReconnectionControle(true)
    })()
  }, [])

  // Après la connection, va récupérer toutes les datas de l'utilisateur
  useEffect(() => {
    if(!allDatasLoad && userID){
        userRequest_LoadDatas()
      }
  }, [userID])




  

  return (
    
    <>
      {reconnectionControle && (
        <div className="app">
          <Popup/>
          
          {!connected && (
            <Connection/>
          )}

          {connected && (
            <>
              <Pannel/>
              <Corp/>
            </>
          )}

          <DevTools/>
        </div>
      )}
    </>
      
  );
}

export default App;
