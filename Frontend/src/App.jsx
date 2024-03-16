import DevTools from "./Components/Scenes/DevTools/DevTools";
import FolderRender from "./Components/Scenes/Folder/FolderRender";
import Render from "./Components/Scenes/Render/Render";
import "./Css/main.css"
import useLocalStorage from "./Utils/useLocalStorage";

function App() {

  useLocalStorage()

  return (
    
      <div className="app">
        <FolderRender/>
        <Render/>


        <DevTools/>
      </div>
  );
}

export default App;
