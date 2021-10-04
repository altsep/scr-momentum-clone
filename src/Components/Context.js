import React, { useState, useEffect } from "react";
import { useFetch } from "../Hooks/useFetch";

const Provider = (props) => {
  // fetch image
  const unsplashUrl =
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape";
  // &query=<item> to search specific terms
  const [unsplashQueryName, setUnsplashQueryName] = useState("");
  const { state: unsplashState, handleBool: handleUnsplashBool } =
    useFetch(unsplashUrl);

  // fetch crypto
  const cryptoUrl = (name) =>
    `https://api.coingecko.com/api/v3/coins/${name}?localization=false&market_data=true`;
  const [cryptoName, setCrypotName] = useState("bitcoin");
  const { state: cryptoState, handleBool: handleCryptoBool } = useFetch(
    cryptoUrl(cryptoName)
  );

  // fetch weather
  const [weatherUrl, setWeatherUrl] = useState("");
  const [weatherName, setWeatherName] = useState("");
  const { state: weatherState, handleBool: handleWeatherBool } =
    useFetch(weatherUrl);

  // Handling initial loader to display elements after timeout in error scenario and to display the loader just once
  const awkwardLoading = useState(true);
  const pseudoLoadingTimeout = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => pseudoLoadingTimeout[1](false), 2000);
    // Use clean-up function to make the process repeatable
    // return () => clearTimeout(timeoutId);
  }, [pseudoLoadingTimeout]);

  // Theming to accomodate initial loader and possible failure to either fetch location or load image. Used instead backup image
  const [theme, setTheme] = useState({});

  const state = unsplashState;
  const error = state.error;
  const url = state.data && state.data.urls.regular;
  useEffect(() => {
    const normal = {
      name: "normal",
      color: "#ededed",
      textShadow: "2px 2px 1px #111111",
      border: "solid 2px rgba(245, 245, 245, 0.6)",
    };
    const awkward = {
      name: "awkward",
      color: "#2b2b2b",
      textShadow: "2px 2px 2px #ededed",
      border: "solid 2px rgba(43, 43, 43, 0.3)",
    };
    awkwardLoading[0] && (state.loadingImage || error)
      ? setTheme(awkward)
      : !error && url && setTheme(normal);
  }, [awkwardLoading[0], state.loadingImage, state.data, error]);

  return (
    <Context.Provider
      value={{
        unsplashState,
        handleUnsplashBool,
        cryptoState,
        handleCryptoBool,
        setWeatherUrl,
        weatherState,
        handleWeatherBool,
        awkwardLoading,
        pseudoLoadingTimeout,
        theme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const Context = React.createContext(null);

export { Context, Provider };
