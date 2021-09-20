import React, { useContext, useState } from "react";
import { Context } from "../App";
import { SwitchSVG, RefreshSVG } from "../Misc/SVGs";
import { ItemContext } from "./Item";

function Controls() {
  const { handleRefreshData, handleRefreshBackgroundImage } = useContext(Context);
  const [dateDisplay, setDateDisplay] = useContext(Context).dateDisplayState;
  const [hoverDate, setHoverDate] = useContext(Context).hoverDateState;
  const [hoverRefreshData, setHoverRefreshData] = useState("");
  const [hoverRefreshBackground, setHoverRefreshBackground] = useState("");
  const [hoverWeather, setHoverWeather] = useContext(Context).hoverWeatherState;
  const [weatherUnits, setWeatherUnits] = useContext(Context).weatherUnitsState;
  const { x } = useContext(ItemContext);

  return (
    <div
      style={Object.assign(
        {
          margin: 10,
          display: "flex",
        },
        x === "center"
          ? {
              transform: "scale(2)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              rowGap: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }
          : null
      )}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginRight: x !== "center" && "0.2rem",
        }}
        onClick={() =>
          setWeatherUnits((state) =>
            state === "metric" ? "imperial" : "metric"
          )
        }
        onMouseOver={() => setHoverWeather("swap-date-hovered")}
        onMouseLeave={() => setHoverWeather("")}
      >
        <p
          style={{
            fontSize: "0.6rem",
            marginRight: "0.15rem",
            textTransform: "uppercase",
          }}
        >
          {weatherUnits}
        </p>
        <SwitchSVG hoverClass={hoverWeather} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginRight: x !== "center" && "0.2rem",
        }}
        onClick={() =>
          setDateDisplay((state) => (state === "date" ? "time" : "date"))
        }
        onMouseOver={() => setHoverDate("swap-date-hovered")}
        onMouseLeave={() => setHoverDate("")}
      >
        <p
          style={{
            fontSize: "0.6rem",
            marginRight: "0.15rem",
            textTransform: "uppercase",
          }}
        >
          {dateDisplay}
        </p>
        <SwitchSVG hoverClass={hoverDate} />
      </div>
      <div
        style={{
          userSelect: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginRight: x !== "center" && "0.2rem",
        }}
        onClick={handleRefreshData}
        onMouseOver={() => setHoverRefreshData("refresh-hovered")}
        onMouseLeave={() => setHoverRefreshData("")}
      >
        <p
          style={{
            fontSize: "0.6rem",
            marginRight: "0.2rem",
            textTransform: "uppercase",
          }}
        >
          data
        </p>
        <RefreshSVG hoverClass={hoverRefreshData} />
      </div>
      <div
        style={{
          userSelect: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleRefreshBackgroundImage}
        onMouseOver={() => setHoverRefreshBackground("refresh-hovered")}
        onMouseLeave={() => setHoverRefreshBackground("")}
      >
        <p
          style={{
            fontSize: "0.6rem",
            marginRight: "0.2rem",
          }}
        >
          BG
        </p>
        <RefreshSVG hoverClass={hoverRefreshBackground} />
      </div>
    </div>
  );
}

export default Controls;
