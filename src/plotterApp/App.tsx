import React, { useEffect, useState } from "react";
import apis from './apis'
import "./App.scss";
import SideBar from "./Components/sidebar";
import Graph from "./Components/chart";


function App() {
  const [sideBarMenu, setSideBarMenu] = useState([])
  useEffect(() => {
     apis.fetchColumns().then((response :any)=>{
      setSideBarMenu(response?.body)
    });
  }, [])
  const renderApp = () => {
    return (
      <>
        { sideBarMenu && (
            <div className="App">
              <SideBar menu={sideBarMenu} />
              <Graph />
            </div>
          )
        }
      </>
    )
  }
  return (
    renderApp()
  )
}
export default App;
