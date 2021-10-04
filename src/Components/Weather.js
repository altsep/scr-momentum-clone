import React, { useState, useEffect, useContext } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";
import { useErrorMessage } from "../Hooks/useErrorMessage";
import ControlsSwitch from "./ControlsSwitch";
import { useRect } from "../Hooks/useRect";
import { IconSwitch } from "../Misc/Icons";

function Weather() {
  const [coords, setCoords] = useState({});
  const {
    setWeatherUrl: setUrl,
    weatherState: state,
    handleWeatherBool: handleBool,
    theme,
  } = useContext(Context);

  const { x, y, canDrop, flexStyleX, flexStyleY, textAlignStyle } =
    useContext(ItemContext);

  const { ErrorMessage, setErrorMessage } = useErrorMessage();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
      handleBool("error", true);
      setErrorMessage("Geolocation failed");
    };

    const locationWatchId = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(pos.coords),
      error,
      options
    );

    return () => navigator.geolocation.clearWatch(locationWatchId);
  }, []);

  const [text, setText] = useState("imperial");

  useEffect(() => {
    coords
      ? setUrl(
          coords.latitude !== undefined &&
            `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${
              coords.latitude
            }&lon=${coords.longitude}&units=${
              text === "imperial" ? "metric" : "imperial"
            }`
        )
      : handleBool("error", true);
  }, [coords.latitude, coords.longitude, text]);

  const loaderText = useLoaderText(
    state.loading,
    x === "center" && "1.4em"
  );

  const iconWithProps = <Icon state={state} handleBool={handleBool} x={x} />;

  // Handle controls
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const rect = useRect("weather", [hover, text]);
  const minorRect = useRect("controls", [rect]);

  return (
    <>
      {state.error ? (
        <ErrorMessage />
      ) : state.loading ? (
        loaderText
      ) : (
        state.data !== null &&
        state.data.main && (
          <div
            id="weather-container"
            style={{
              placeSelf: (canDrop || x === "center") && "center",
              margin: 10,
            }}
            onClick={() =>
              setText((state) => (state === "imperial" ? "metric" : "imperial"))
            }
            onMouseDown={() => {
              setActive(true);
              setHover(false);
            }}
            onMouseUp={() => {
              setActive(false);
            }}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {x === "center" ? (
              <div
                id="weather"
                style={{
                  width: "18em",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: flexStyleX,
                  alignItems: flexStyleY,
                  textAlign: flexStyleX,
                  padding: 0,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: flexStyleX,
                  }}
                >
                  <p
                    style={{
                      fontSize: "3em",
                      fontWeight: "700",
                    }}
                  >
                    {state.data.main.temp.toFixed(1) +
                      (text === "imperial" ? "°C" : "°F")}
                  </p>
                  <div
                    className="weather details"
                    style={{
                      marginTop: 10,
                      // fontSize: "0.7em",
                      fontWeight: "100",
                      display: "flex",
                    }}
                  >
                    Feels like&nbsp;
                    {state.data.main.feels_like.toFixed(1) +
                      (text === "imperial" ? "°C" : "°F")}
                  </div>
                  <div
                    className="weather border-line"
                    style={{
                      marginTop: 30,
                      paddingTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderTop: theme.border,
                    }}
                  >
                    <p className="title">{state.data.name}</p>
                    {iconWithProps}
                  </div>
                </div>
                <div
                  className="weather details border-line"
                  style={{
                    marginLeft: 30,
                    paddingLeft: 30,
                    fontSize: "1em",
                    fontWeight: "100",
                    lineHeight: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: flexStyleY,
                    borderLeft: theme.border,
                    width: "50%",
                    textAlign: "start",
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
                    {text === "imperial" ? "m/s" : "mph"}
                  </p>
                  <p>{state.data.main.humidity}%</p>
                  <p>{state.data.main.pressure}hPa</p>
                </div>
              </div>
            ) : (
              <div
                id="weather"
                style={{
                  // width: "7em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: flexStyleY,
                  alignItems: flexStyleX,
                  textAlign: flexStyleX,
                  padding: 0,
                }}
              >
                <p className="weather title">{state.data.name}</p>
                <div
                  style={{
                    lineHeight: 1.5,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: flexStyleX,
                    alignItems: "center",
                  }}
                >
                  {x === "right" && iconWithProps}
                  <div
                    className="weather details"
                    style={{
                      marginTop: 10,
                      fontWeight: "100",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: flexStyleY,
                      alignItems: flexStyleX,
                    }}
                  >
                    <p>
                      {state.data.main.temp.toFixed(1) +
                        (text === "imperial" ? "°C" : "°F")}
                    </p>
                    <p>{state.data.weather[0].main}</p>
                    <p>
                      {state.data.wind.speed.toFixed() +
                        (text === "imperial" ? "m/s" : "mph")}
                    </p>
                  </div>
                  {x === "left" && iconWithProps}
                </div>
              </div>
            )}
            <ControlsSwitch
              values={{
                x,
                y,
                rect,
                minorRect,
                active,
                setActive,
                hover,
                setHover,
                text,
                icon: <IconSwitch active={active} />,
              }}
            />
          </div>
        )
      )}
    </>
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
