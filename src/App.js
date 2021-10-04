import React, { useState } from "react";
import Item from "./Components/Item";
import Crypto from "./Components/Crypto";
import Weather from "./Components/Weather";
import Location from "./Components/Location";
import CurrentDate from "./Components/MyDate";
import Info from "./Components/Info";
import Background from "./Components/BackgroundImage";
import { Context } from "./Components/Context";

function App() {
  const [itemList, setItemList] = useState([
    { id: "crypto", el: <Crypto /> },
    { id: "weather", el: <Weather /> },
    { id: "date", el: <CurrentDate /> },
    { id: "location", el: <Location /> },
    { id: "info", el: <Info /> },
  ]);

  const {
    theme,
    awkwardLoading,
    unsplashState,
    handleUnsplashBool: handleBool,
  } = React.useContext(Context);

  return (
    <div
      id="main"
      style={{
        background: awkwardLoading[0]
          ? "#fff"
          : unsplashState.error && "#fcfcfc",
        color: theme.color,
        textShadow: theme.textShadow,
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
      }}
    >
      {itemList.map((el, i) => {
        const pos = getPosition(i);
        return (
          <Item
            el={el.el}
            id={el.id}
            setList={setItemList}
            key={el.id}
            x={pos.x}
            y={pos.y}
          />
        );
      })}
      <Background />
    </div>
  );
}

const getPosition = (i) => {
  switch (i) {
    case 0:
      return { x: "left", y: "top" };
    case 1:
      return { x: "right", y: "top" };
    case 2:
      return { x: "center", y: "center" };
    case 3:
      return { x: "left", y: "bottom" };
    case 4:
      return { x: "right", y: "bottom" };
    default:
      return { x: "center", y: "center" };
  }
};

export default App;
