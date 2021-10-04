import React, { useState, useEffect } from "react";
import { IconSwitch } from "../Misc/Icons";

const ControlsWeather = ({ values }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: x !== "center" && "0.2rem",
      }}
      onClick={() =>
        setWeatherUnits((state) => (state === "metric" ? "imperial" : "metric"))
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
      <IconSwitch active={active} />
    </div>
  );
};
