import React, { useEffect, useState } from "react";
import { DragDropContainer } from "react-drag-drop-container";

function SideBar(props) {
  const [sideMenu, setSideMenu] = useState<any[]>([])
  useEffect(() => {
    setSideMenu(props.menu)
  }, [props.menu])
  return (
    <div className="sideBar">
      <div className="SideBar-Header">
        <p>Columns</p>
      </div>
      <div className="SideBar-Content">
        <ul>
          {sideMenu?.map((item) => (
            <>
              <DragDropContainer
                dragData={item}
                targetKey={item.function}
                key={item.name}
                className="listItem"
              >
                <li
                  id={item.name}
                  key={item.name}
                >
                  {item.name}
                </li>
              </DragDropContainer>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;