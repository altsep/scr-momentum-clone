import React, { useState, useEffect, useContext } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";
import { errorMessage } from "../Misc/minorElements";
import { logError } from "../Misc/minorElements";

function Weather() {
  const [coords, setCoords] = useState({});
  const {
    setWeatherUrl: setUrl,
    weatherState: state,
    handleWeatherBool: handleBool,
    theme,
  } = useContext(Context);
  const [units, setUnits] = useContext(Context).weatherUnits;
  const setHover = useContext(Context).hoverWeather[1];
  const { x, id, canDrop, textAlignStyle } = useContext(ItemContext);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
      handleBool("error", true);
    };

    const locationWatchId = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(pos.coords),
      error,
      options
    );

    return () => navigator.geolocation.clearWatch(locationWatchId);
  }, [handleBool]);

  useEffect(() => {
    coords
      ? setUrl(
          coords.latitude !== undefined &&
            `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${
              coords.latitude
            }&lon=${coords.longitude}&units=${
              units === "imperial" ? "metric" : "imperial"
            }`
        )
      : handleBool("error", true);
  }, [coords.latitude, coords.longitude, units]);

  const loaderText = useLoaderText(
    state.loading,
    x === "center" && "1.4em",
    textAlignStyle
  );

  const flexStyle = useContext(ItemContext).flexStyle;

  const iconWithProps = <Icon state={state} handleBool={handleBool} x={x} />;

  return (
    <div
      style={{ placeSelf: (canDrop || x === "center") && "center", margin: 10 }}
    >
      {state.error ? (
        (() => {
          // logError(id, state.error);
          return errorMessage;
        })()
      ) : state.loading ? (
        loaderText
      ) : state.data !== null && state.data.main && x === "center" ? (
        <div
          id={"weather"}
          style={{
            width: "18em",
            display: "flex",
            flexDirection: "row",
            justifyContent: flexStyle,
            alignItems: flexStyle,
            textAlign: flexStyle,
            padding: 0,
          }}
          onClick={() => setUnits(units === "imperial" ? "metric" : "imperial")}
          onMouseOver={() => setHover("swap-date-hovered")}
          onMouseLeave={() => setHover("")}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: flexStyle,
            }}
          >
            <p
              style={{
                fontSize: "3em",
                fontWeight: "700",
              }}
            >
              {state.data.main.temp.toFixed(1) +
                (units === "imperial" ? "°C" : "°F")}
            </p>
            <p
              style={{
                marginTop: 10,
                fontSize: "0.7em",
                fontWeight: "100",
              }}
            >
              Feels like&nbsp;
              {state.data.main.feels_like.toFixed(1) +
                (units === "imperial" ? "°C" : "°F")}
            </p>
            <div
              className="border-line"
              style={{
                marginTop: 30,
                fontSize: "0.8em",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                borderTop: theme.border,
                paddingTop: 10,
              }}
            >
              <p>{state.data.name}</p>
              {iconWithProps}
            </div>
          </div>
          <div
            style={{
              marginTop: 10,
              lineHeight: 2,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: flexStyle,
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              id="weather-details"
              className="border-line"
              style={{
                marginLeft: 30,
                fontSize: "0.8em",
                fontWeight: "100",
                display: "flex",
                flexDirection: "column",
                justifyContent: flexStyle,
                borderLeft: theme.border,
                paddingLeft: 30,
              }}
            >
              <p
                style={{
                  textTransform: "capitalize",
                }}
              >
                {state.data.weather[0].description}
              </p>
              <p>
                {state.data.wind.speed.toFixed()}
                {units === "imperial" ? "m/s" : "mph"}
              </p>
              <p>{state.data.main.humidity}%</p>
              <p>{state.data.main.pressure}hPa</p>
            </div>
          </div>
        </div>
      ) : state.error ? (
        (() => {
          console.log(`Weather: ${state.error}`);
          return errorMessage;
        })()
      ) : state.loading || !state.data ? (
        loaderText
      ) : (
        state.data !== null &&
        state.data.main && (
          <div
            id="weather"
            style={{
              width: "7em",
              display: "flex",
              flexDirection: "column",
              justifyContent: flexStyle,
              alignItems: flexStyle,
              textAlign: flexStyle,
              padding: 0,
            }}
            onClick={() =>
              setUnits(units === "imperial" ? "metric" : "imperial")
            }
            onMouseOver={() => setHover("swap-date-hovered")}
            onMouseLeave={() => setHover("")}
          >
            <p>{state.data.name}</p>
            <div
              style={{
                lineHeight: 1.5,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: flexStyle,
                alignItems: "center",
              }}
            >
              {x === "right" && iconWithProps}
              <div
                id="weather-details"
                style={{
                  marginTop: 10,
                  fontSize: "0.7em",
                  fontWeight: "100",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: flexStyle,
                  alignItems: flexStyle,
                }}
              >
                <p>
                  {state.data.main.temp.toFixed(1) +
                    (units === "imperial" ? "°C" : "°F")}
                </p>
                <p>{state.data.weather[0].main}</p>
                <p>
                  {state.data.wind.speed.toFixed() +
                    (units === "imperial" ? "m/s" : "mph")}
                </p>
              </div>
              {x === "left" && iconWithProps}
            </div>
          </div>
        )
      )}
    </div>
  );
}

const Icon = (props) => {
  return (
    <div hidden={props.state.loadingImage}>
      <img
        style={{
          display: "flex",
          margin: props.x !== "center" && "0 1em",
          pointerEvents: "none",
        }}
        src={
          props.state.data &&
          `https://openweathermap.org/img/w/${props.state.data.weather[0].icon}.png`
        }
        alt=""
        onLoad={() => props.handleBool("loadingImage", false)}
        onError={() => {
          props.handleBool("loadingImage", false);
          console.log("Weather icon couldn't load");
        }}
      />
    </div>
  );
};

export default Weather;
