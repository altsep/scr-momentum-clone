import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../Hooks/useFetch";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "../App";
import { ItemContext } from "./Item";
import { errorMessage } from "../Misc/minorElements";

function Weather(props) {
  const [coords, setCoords] = useState({ data: {}, error: false });
  const [url, setUrl] = useState("");
  const [units, setUnits] = useContext(Context).weatherUnitsState;
  const [hover, setHover] = useContext(Context).hoverWeatherState;
  const { refreshData } = useContext(Context);
  const { x } = React.useContext(ItemContext);
  const { state, handleLoadingImage } = useFetch(url, refreshData);

  // console.log('refresh')

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
      setCoords((state) => ({ ...state, error: err }));
    };

    let locationWatchId = navigator.geolocation.watchPosition(
      (pos) => setCoords({ data: pos.coords, error: false }),
      error,
      options
    );

    return () => navigator.geolocation.clearWatch(locationWatchId);
  }, []);
   

  useEffect(() => {
    setUrl(
      coords.data.latitude !== undefined &&
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${
          coords.data.latitude
        }&lon=${coords.data.longitude}&units=${
          units === "imperial" ? "metric" : "imperial"
        }`
    );
  }, [coords.data.latitude, coords.data.longitude, units]);

  const loaderText = useLoaderText(state.loading);

  const Icon = () => (
    <img
      style={{
        display: "flex",
        margin: x !== "center" && "0 1em",
        pointerEvents: "none",
      }}
      src={
        state.data &&
        `https://openweathermap.org/img/w/${state.data.weather[0].icon}.png`
      }
      alt=""
      hidden={state.loadingImage}
      onLoad={() => handleLoadingImage(false)}
      onError={() => handleLoadingImage(false)}
    />
  );

  const flexStyle = x === "left" ? "start" : x === "center" ? "center" : "end";

  return (
    <div style={{ margin: 10 }}>
      {state.error ? (
        (() => {
          console.log(`Weather: ${state.error}`);
          return errorMessage;
        })()
      ) : state.loading || !state.data ? (
        loaderText
      ) : state.data !== null && x === "center" ? (
        <div
          id="weather"
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
              style={{
                marginTop: 20,
                fontSize: "0.8em",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                borderTop: "solid rgba(245, 245, 245, 0.6) 2px",
                paddingTop: 10,
              }}
            >
              <p>{state.data.name}</p>
              <Icon />
            </div>
          </div>
          <div
            style={{
              marginTop: 10,
              lineHeight: 1.5,
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
              style={{
                marginLeft: 20,
                fontSize: "0.8em",
                fontWeight: "100",
                display: "flex",
                flexDirection: "column",
                justifyContent: flexStyle,
                borderLeft: "solid rgba(245, 245, 245, 0.6) 2px",
                paddingLeft: 20,
              }}
            >
              <p>
                {state.data.main.temp.toFixed(1)}°
                {units === "imperial" ? "C" : "F"}
              </p>
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
        state.data !== null && (
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
              {x === "right" && <Icon />}
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
              {x === "left" && <Icon />}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Weather;
