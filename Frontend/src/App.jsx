import { useSelector } from "react-redux";
import DevTools from "./Components/Scenes/DevTools/DevTools";
import FolderRender from "./Components/Scenes/Folder/FolderRender";
import Render from "./Components/Scenes/Render/Render";
import "./Css/main.css"
import useLocalStorage from "./Utils/useLocalStorage";
import Connection from "./Components/Scenes/Connection/Connection";
import Popup from "./Components/Scenes/Popup/Popup";
import { useEffect, useState } from "react";

function App() {

  const {mongoDB_reconnectUser} = useLocalStorage()
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
