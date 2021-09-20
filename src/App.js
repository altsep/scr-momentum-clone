import React, { useState } from "react";
import Crypto from "./Components/Crypto";
import Weather from "./Components/Weather";
import CurrentDate from "./Components/MyDate";
import Location from "./Components/Location";
import Controls from "./Components/Controls";
import Item from "./Components/Item";
import BackgroundImage from "./Components/BackgroundImage";
import { useFetch } from "./Hooks/useFetch";
import { useRefresh } from "./Hooks/useRefresh";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { backgroundImageUrl } from "./Misc/apiUrls";

function App() {
  const [refreshData, handleRefreshData] = useRefresh(false);
  const [refreshBackgroundImage, handleRefreshBackgroundImage] =
    useRefresh(false);
  const backgroundImageData = useFetch(
    backgroundImageUrl,
    refreshBackgroundImage
  );
  const dateDisplayState = useState("date");
  const hoverDateState = useState("");
  const hoverWeatherState = useState("");
  const weatherUnitsState = useState("imperial");
  const [bool, setBool] = useState(false);

  const [itemList, setItemList] = useState([
    { id: "crypto", el: <Crypto /> },
    { id: "weather", el: <Weather /> },
    { id: "location", el: <Location /> },
    { id: "controls", el: <Controls /> },
    { id: "date", el: <CurrentDate /> },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Provider
        value={{
          refreshData,
          handleRefreshData,
          handleRefreshBackgroundImage,
          backgroundImageState: backgroundImageData.state,
          dateDisplayState,
          hoverDateState,
          hoverWeatherState,
          weatherUnitsState,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr 0px",
            height: "100vh",
            color: "#f5f5f5",
            fontSize: "1.5rem",
            textShadow: "2px 2px 2px #f5f5f57a",
          }}
          onClick={() => setBool(bool ? false : true)}
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
          <BackgroundImage
            state={backgroundImageData.state}
            handleLoadingImage={backgroundImageData.handleLoadingImage}
          />
        </div>
      </Provider>
    </DndProvider>
  );
}

const getPosition = (i) => {
  switch (i) {
    case 0:
      return { x: "left", y: "top" };
    case 1:
      return { x: "right", y: "top" };
    case 2:
      return { x: "left", y: "bottom" };
    case 3:
      return { x: "right", y: "bottom" };
    case 4:
      return { x: "center", y: "center" };
    default:
      return { x: "center", y: "center" };
  }
};

export const Context = React.createContext(null);
const Provider = Context.Provider;

export default App;
