import { useSelector } from "react-redux";
import DevTools from "./Components/DevTools/DevTools";
import Pannel from "./View/Pannel/Pannel";
import Corp from "./View/Corp/Corp";
import "./Css/main.css"
import Popup from "./Components/Popup/Popup";
import { useEffect, useState } from "react";
import Connection from "./View/Connection/Connection";
import useFetchRequest from "./Utils/useFetchRequest";

function App() {

  const connected = useSelector(store => store.connection.connected)
  const userID = useSelector(store => store.connection.connectedUser._id)
  const allDatasLoad = useSelector(store => store.user.allDatasLoad)
  const [reconnectionControle, setReconnectionControle] = useState(false)
  const {fetchRequest} = useFetchRequest()
  
  // Tentative de reconnection par le cookie
  useEffect(() => {
    (async () => {
      await fetchRequest("GET", "user/reconnect")
      setReconnectionControle(true)
    })()
  }, [])

  // Après la connection, va récupérer toutes les datas de l'utilisateur
  useEffect(() => {
    if(!allDatasLoad && userID){
        fetchRequest("GET", "user/loadDatas")
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
