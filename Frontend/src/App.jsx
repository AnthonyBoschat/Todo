import { useSelector } from "react-redux";
import DevTools from "./Components/DevTools/DevTools";
import Pannel_Layout from "./Layout/Pannel/Pannel_Layout";
import Corp_Layout from "./Layout/Corp/Corp_Layout";
import "./Css/main.css"
import Popup from "./Components/Popup/Popup";
import { useEffect, useState } from "react";
import useFetchRequest from "./Utils/useFetchRequest";
import Connection_Layout from "./Components/Connection/Connection_Layout";

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
            <Connection_Layout/>
          )}

          {connected && (
            <>
              <Pannel_Layout/>
              <Corp_Layout/>
            </>
          )}

          <DevTools/>
        </div>
      )}
    </>
      
  );
}

export default App;
