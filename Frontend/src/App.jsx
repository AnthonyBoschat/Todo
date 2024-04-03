import { useSelector } from "react-redux";
import DevTools from "./Components/DevTools/DevTools";
import Pannel from "./View/Pannel/Pannel";
import Corp from "./View/Corp/Corp";
import "./Css/main.css"
import useMongoDB from "./Utils/useMongoDB";
import Connection from "./Components/Connection/Connection";
import Popup from "./Components/Popup/Popup";
import { useEffect, useState } from "react";

function App() {

  const connected = useSelector(store => store.connection.connected)
  const userID = useSelector(store => store.connection.connectedUser._id)
  const allDatasLoad = useSelector(store => store.user.allDatasLoad)
  const {mongoDB_reconnectUser, mongoDB_getAllData} = useMongoDB()
  const [reconnectionControle, setReconnectionControle] = useState(false)

  
  // Tentative de reconnection par le cookie
  useEffect(() => {
    // Hein ?
    // console.log("1")
    (async () => {
      await mongoDB_reconnectUser()
      setReconnectionControle(true)
    })()
  }, [])

  // Après la connection, va récupérer toutes les datas de l'utilisateur
  useEffect(() => {
      
    if(!allDatasLoad && userID){
        
          mongoDB_getAllData()
      }
  }, [userID])

  

  return (
    
    <>
      {reconnectionControle && (
        <div className="app">
          <Popup/>
          
          {!connected && (<Connection/>)}

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
