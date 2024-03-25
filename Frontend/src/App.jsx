import { useSelector } from "react-redux";
import DevTools from "./Components/DevTools/DevTools";
import FolderRender from "./Components/Folder/FolderRender";
import Render from "./Components/Render/Render";
import "./Css/main.css"
import useMongoDB from "./Utils/useMongoDB";
import Connection from "./Components/Connection/Connection";
import Popup from "./Components/Popup/Popup";
import { useEffect, useState } from "react";

function App() {

  const {mongoDB_reconnectUser} = useMongoDB()
  const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
  const connected = useSelector(store => store.connection.connected)
  const popupHidden = useSelector(store => store.popup.hidden)
  const [reconnectionControle, setReconnectionControle] = useState(false)

  useEffect(() => {
    const reconnect = async () => {
      await mongoDB_reconnectUser()
      setReconnectionControle(true)
    }
    reconnect()
  }, [])

  return (
    
    <>
      {reconnectionControle && (
        <div className="app">

          <FolderRender/>
          {(!connected && !folderSelectedID) && (<Connection/>)}
          {!popupHidden && <Popup/>}
          <Render/>


          <DevTools/>
        </div>
      )}
    </>
      
  );
}

export default App;
