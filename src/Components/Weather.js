import React, { useState, useEffect, useContext } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { ItemContext } from './Item';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import ControlsSwitch from '../Misc/ControlsSwitch';
import { IconSwitch } from '../Misc/Icons';
import { WeatherFull } from './WeatherFull';
import { WeatherSmall } from './WeatherSmall';
import { IconWeather as Icon } from '../Misc/Icons';
import { useFetch } from '../Hooks/useFetch';

function Weather() {
  const [coords, setCoords] = useState();
  const { theme } = useContext(Context);

  const { id, x, y, isDragging, canDrop, flexStyleX, flexStyleY, windowSmall } =
    useContext(ItemContext);

  const [cityName, setCityName] = useState('');
  const [url, setUrl] = useState('');
  const { state, handleBool } = useFetch(url);

  useEffect(() => {
    const item = localStorage.getItem('weatherLocationName');
    item && setCityName(item);
  }, []);

  useEffect(() => {
    cityName &&
      fetch(
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${cityName}`
      )
        .then((a) => a.ok && a.json())
        .then(
          (a) =>
            a.cod !== '404' &&
            localStorage.setItem('weatherLocationName', cityName)
        )
        .catch(() => console.log('Failed to fetch weather.'));
  }, [cityName]);

  const { ErrorMessage, setErrorText, errorDisplay } = useErrorMessage(state);

  useEffect(
    () =>
      state.errorDetails &&
      state.errorDetails === 'Failed to fetch' &&
      setErrorText(state.errorDetails),
    [state.errorDetails]
  );

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const error = (err) => {
      console.log(`ERROR(${err.code}): ${err.message}`);
      // handleBool('error', true);
      setErrorText('Geolocation failed');
    };

    const locationWatchId = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(pos.coords),
      error,
      options
    );

    return () => navigator.geolocation.clearWatch(locationWatchId);
  }, []);

  const [units, setUnits] = useState('imperial');

  useEffect(() => {
    const item = localStorage.getItem('weatherSwitchTo');
    item && setUnits(item);
  }, []);

  useEffect(() => localStorage.setItem('weatherSwitchTo', units), [units]);

  useEffect(() => {
    cityName.length > 0
      ? setUrl(
          `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${cityName}&units=${
            units === 'imperial' ? 'metric' : 'imperial'
          }`
        )
      : coords &&
        setUrl(
          coords.latitude !== undefined &&
            `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${
              coords.latitude
            }&lon=${coords.longitude}&units=${
              units === 'imperial' ? 'metric' : 'imperial'
            }`
        );
  }, [coords, units, cityName]);

  const loaderText = useLoaderText(state.loading, x === 'center' && '1.4em');
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () =>
    !state.error &&
    setUnits((state) => (state === 'imperial' ? 'metric' : 'imperial'));

  useEffect(() => {
    const onKeyDown = (e) => {
      e.shiftKey && e.key.toLowerCase() === 'u' && handleClick();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    state.data && state.data.name && handleBool('error', false);
  }, []);

  const [values, setValues] = useState({ temp: '', feels: '', wind: '' });

  useEffect(() => {
    const tempText = units === 'imperial' ? '°C' : '°F';
    const windText = units === 'imperial' ? 'm/s' : 'mph';
    state.data &&
      setValues({
        temp: /\.0$/.test(state.data.main.temp.toFixed(1))
          ? Math.round(state.data.main.temp) + tempText
          : state.data.main.temp.toFixed(1) + tempText,
        feels: /\.0$/.test(state.data.main.feels_like.toFixed(1))
          ? Math.round(state.data.main.feels_like) + tempText
          : state.data.main.feels_like.toFixed(1) + tempText,
        wind: state.data.wind.speed.toFixed() + windText,
      });
  }, [state, units]);

  const [dataAvailable, setDataAvailable] = useState(false);
  useEffect(
    () =>
      state && state.data ? setDataAvailable(true) : setDataAvailable(false),
    [setErrorText, state, state.data]
  );

  const iconWithProps = (
    <Icon
      state={state}
      handleBool={handleBool}
      x={x}
      dataAvailable={dataAvailable}
    />
  );

  const propsMain = {
    id,
    x,
    state,
    text: units,
    temp: values.temp,
    feels: values.feels,
    wind: values.wind,
    theme,
    flexStyleX,
    flexStyleY,
    iconWithProps,
    setQuery: setCityName,
    char: 'w',
    handleClick: handleClick,
    windowSmall,
  };

  return (
    <div
      id='weather-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexStyleY,
        alignItems: flexStyleX,
        transform: windowSmall && 'scale(1.4)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: x === 'center' ? 'column' : 'row',
        }}
        onMouseDown={() => {
          setActive(true);
          setHover(false);
        }}
        onMouseUp={() => {
          setActive(false);
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {state.loading ? (
          loaderText
        ) : x === 'center' ? (
          <WeatherFull props={propsMain} />
        ) : (
          <WeatherSmall props={propsMain} />
        )}
        {!isDragging && !canDrop && !windowSmall && state.data && (
          <ControlsSwitch
            props={{
              id,
              x,
              y,
              active,
              setActive,
              hover,
              setHover,
              text: units,
              icon: <IconSwitch active={active} />,
              handleClick: handleClick,
            }}
          />
        )}
      </div>
      {((state.error && errorDisplay) || !dataAvailable) && <ErrorMessage />}
    </div>
  );
}

export default Weather;
