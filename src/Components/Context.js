import React, { useState, useEffect } from 'react';
import { useFetch } from '../Hooks/useFetch';

const Provider = (props) => {
  // fetch image
  const unsplashName = useState('');
  const [unsplashUrl, setUnsplashUrl] = useState('');

  const { state: unsplash, handleBool: handleUnsplashBool } =
    useFetch(unsplashUrl);

  const unsplashUrlTemp =
    'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape';
  useEffect(() => {
    const item = localStorage.getItem('imageThemeName');
    if (item) {
      setUnsplashUrl(unsplashUrlTemp + `&query=${item}`);
    } else setUnsplashUrl(unsplashUrlTemp);
  }, []);

  useEffect(() => {
    if (unsplashName[0]) {
      setUnsplashUrl(unsplashUrlTemp + `&query=${unsplashName[0]}`);
      fetch(unsplashUrlTemp)
        .then((a) => {
          a.ok && localStorage.setItem('imageThemeName', unsplashName[0]);
        })
        .catch((err) => console.log('Failed to fetch unsplash.'));
    }
  }, [unsplashName]);

  // fetch crypto
  const cryptoName = useState('');
  const cryptoUrl = `https://api.coingecko.com/api/v3/coins/${cryptoName[0]}?localization=false&market_data=true`;
  const [cryptoFetchUrl, setCryptoFetchUrl] = useState('');
  const { state: cryptoState, handleBool: handleCryptoBool } =
    useFetch(cryptoFetchUrl);

  useEffect(() => {
    const item = localStorage.getItem('cryptoCurrencyName');
    cryptoName[1](item ? item : 'bitcoin');
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('cryptoCurrencyName');
    fetch(cryptoUrl)
      .then((a) => {
        if (a.ok && cryptoName[0]) {
          localStorage.setItem('cryptoCurrencyName', cryptoName[0]);
          setCryptoFetchUrl(cryptoUrl);
        } else if (item) cryptoName[1](item);
      })
      .catch((err) => console.log('Failed to fetch crypto.'));
  }, [cryptoName, cryptoUrl]);

  // fetch weather
  const cityName = useState('');
  const [weatherUrl, setWeatherUrl] = useState('');
  const { state: weatherState, handleBool: handleWeatherBool } =
    useFetch(weatherUrl);

  useEffect(() => {
    const item = localStorage.getItem('weatherLocationName');
    item && cityName[1](item);
  }, []);

  useEffect(() => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${cityName}`
    )
      .then((a) => a.ok && a.json())
      .then(
        (a) =>
          a.cod !== '404' &&
          localStorage.setItem('weatherLocationName', cityName[0])
      )
      .catch((err) => console.log('Failed to fetch weather.'));
  }, [cityName]);

  // Handling initial loader to display elements after timeout in error scenario and to display the loader just once
  const awkwardLoading = useState(true);
  const pseudoLoadingTimeout = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => pseudoLoadingTimeout[1](false), 1000);
    // Use clean-up function to make the process repeatable
    return () => clearTimeout(timeoutId);
  }, [pseudoLoadingTimeout]);

  // Theming to accomodate initial loader and possible failure to either fetch location or load image. Used instead of a backup image
  const [theme, setTheme] = useState({});

  const state = unsplash;
  const error = state.error;
  const url = state.data && state.data.urls.regular;
  const themes = {
    normal: {
      name: 'normal',
      color: '#ededed',
      textShadow: '2px 2px 1px #111111',
      border: 'solid 2px #f5f5f599',
    },
    awkward: {
      name: 'awkward',
      color: '#2b2b2b',
      textShadow: '2px 2px 2px #ededed',
      border: 'solid 2px #2b2b2b4d',
    },
  };
  useEffect(() => {
    awkwardLoading[0] && (state.loadingImage || error)
      ? setTheme(themes.awkward)
      : !error && url && setTheme(themes.normal);
  }, [awkwardLoading[0], state.loadingImage, state.data, error]);

  // State for info element that is used in main component
  const [infoStatus, setInfoStatus] = useState('initial');

  // Get window dimensions on resize
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions();
    window.addEventListener('resize', () => setDimensions());
    return () => window.removeEventListener('resize', () => setDimensions());
  }, []);

  useEffect(() => setDimensions(), [infoStatus]);

  const setDimensions = () =>
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  return (
    <Context.Provider
      value={{
        unsplash,
        handleUnsplashBool,
        cryptoState,
        handleCryptoBool,
        setWeatherUrl,
        weatherState,
        handleWeatherBool,
        awkwardLoading,
        pseudoLoadingTimeout,
        theme,
        themes,
        cryptoName,
        infoStatus,
        setInfoStatus,
        unsplashName,
        cityName,
        windowDimensions,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const Context = React.createContext(null);

export { Context, Provider };
