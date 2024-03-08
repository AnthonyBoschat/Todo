import DevTools from "./Components/Scenes/DevTools/DevTools";
import FolderRender from "./Components/Scenes/Folder/FolderRender";
import Render from "./Components/Scenes/Render/Render";
import "./Css/main.css"

function App() {
  return (
    
      <div className="app">
        <FolderRender/>
        <Render/>


        <DevTools/>
      </div>
  );
}

export default App;
