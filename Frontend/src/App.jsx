import { useSelector } from "react-redux";
import DevTools from "./Components/DevTools/DevTools";
import Pannel from "./Components/Pannel/Pannel";
import Render from "./Components/Render/Render";
import "./Css/main.css"
import useMongoDB from "./Utils/useMongoDB";
import Connection from "./Components/Connection/Connection";
import Popup from "./Components/Popup/Popup";
import { useEffect, useState } from "react";
import useUpdate from "./Utils/useUpdate";

function App() {

  
  const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
  const connected = useSelector(store => store.connection.connected)
  const popupHidden = useSelector(store => store.popup.hidden)
  const {mongoDB_reconnectUser} = useMongoDB()

  const [reconnectionControle, setReconnectionControle] = useState(false)

  // Responsable de toutes les mises à jours redux automatique
  useUpdate()

  // Tentative de reconnection par le cookie
  useEffect(() => {

    (async () => {
      await mongoDB_reconnectUser()
      setReconnectionControle(true)
    })()

  }, [])

  

  return (
    
    <>
      {reconnectionControle && (
        <div className="app">
          {!popupHidden && <Popup/>}
          
          {(!connected && !folderSelectedID) && (<Connection/>)}

          {connected && (
            <>
              <Pannel/>
              <Render/>
            </>
          )}

          <DevTools/>
        </div>
      )}
    </>
      
  );
}

export default App;
