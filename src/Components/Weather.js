import React, { useState, useEffect, useContext } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { ItemContext } from './Item';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import ControlsSwitch from '../Misc/ControlsSwitch';
import { IconSwitch } from '../Misc/Icons';
import NamePlusInput from './NamePlusInput';

function Weather() {
  const [coords, setCoords] = useState();
  const {
    setWeatherUrl: setUrl,
    cityName: cityNameState,
    weatherState: state,
    handleWeatherBool: handleBool,
    theme,
  } = useContext(Context);

  const [cityName, setCityName] = cityNameState;

  const { id, x, y, isDragging, canDrop, flexStyleX, flexStyleY, windowSmall } =
    useContext(ItemContext);

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

  const iconWithProps = <Icon state={state} handleBool={handleBool} x={x} />;

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
        placeSelf: (canDrop || x === 'center') && 'center',
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
        {state.loading
          ? loaderText
          : state &&
            state.data &&
            state.data.main &&
            (x === 'center' ? (
              <WeatherFull props={propsMain} />
            ) : (
              <WeatherSmall props={propsMain} />
            ))}
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
      {state.error && errorDisplay && (
        <ErrorMessage
          x={x}
          theme={theme}
          style={{
            display: 'border-box',
            marginTop: state.data ? 10 : '',
            justifySelf: flexStyleX,
          }}
        />
      )}
    </div>
  );
}

const WeatherFull = ({ props }) => {
  const {
    state,
    temp,
    feels,
    wind,
    x,
    flexStyleX,
    flexStyleY,
    iconWithProps,
    id,
    setQuery,
    theme,
    char,
    handleClick,
  } = props;
  return (
    <div
      className='weather'
      style={{
        width: '19em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: flexStyleX,
        alignItems: flexStyleY,
        textAlign: flexStyleX,
        padding: 0,
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: flexStyleX,
        }}
      >
        <p
          style={{
            fontSize: '3em',
            fontWeight: '700',
          }}
          onClick={handleClick}
        >
          {temp}
        </p>
        <div
          className='weather details'
          style={{
            marginTop: 10,
            fontSize: '0.7em',
            fontWeight: '100',
            display: 'flex',
          }}
          onClick={handleClick}
        >
          Feels like&nbsp;
          {feels}
        </div>
        <div
          className='weather border-line'
          style={{
            marginTop: 30,
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTop: theme.border,
          }}
        >
          <div className='title'>
            <NamePlusInput
              id={id}
              x={x}
              state={state}
              setQuery={setQuery}
              titleText={state.data.name}
              theme={theme}
              char={char}
            />
          </div>
          {iconWithProps}
        </div>
      </div>
      <div
        className='weather details border-line'
        style={{
          marginLeft: 30,
          paddingLeft: 30,
          fontSize: '1em',
          fontWeight: '100',
          lineHeight: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: flexStyleY,
          borderLeft: theme.border,
          width: '50%',
          textAlign: 'start',
        }}
        onClick={handleClick}
      >
        <p
          style={{
            textTransform: 'capitalize',
          }}
        >
          {state.data.weather[0].description}
        </p>
        <p>{wind}</p>
        <p>{state.data.main.humidity}%</p>
        <p>{state.data.main.pressure}hPa</p>
      </div>
    </div>
  );
};

const WeatherSmall = ({ props }) => {
  const {
    state,
    temp,
    wind,
    x,
    flexStyleX,
    flexStyleY,
    iconWithProps,
    id,
    setQuery,
    theme,
    char,
    handleClick,
    windowSmall,
  } = props;
  return (
    <div
      className='weather'
      style={{
        width: windowSmall ? '100%' : '7em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexStyleY,
        alignItems: flexStyleX,
        textAlign: flexStyleX,
        padding: 0,
      }}
    >
      <div className='weather title'>
        <NamePlusInput
          id={id}
          x={x}
          state={state}
          setQuery={setQuery}
          titleText={state.data.name}
          theme={theme}
          char={char}
        />
      </div>
      <div
        style={{
          lineHeight: 1.5,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: flexStyleX,
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        {iconWithProps}
        <div
          className='weather details'
          style={{
            marginTop: 10,
            fontWeight: '100',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: flexStyleY,
            alignItems: windowSmall ? 'flex-start' : flexStyleX,
          }}
        >
          <p>{temp}</p>
          <p>{state.data.weather[0].main}</p>
          <p>{wind}</p>
        </div>
      </div>
    </div>
  );
};

const Icon = (props) => {
  return (
    <div
      hidden={props.state.loadingImage}
      style={{
        order: props.x === 'right' ? -1 : 1 || '',
      }}
    >
      <img
        style={{
          display: 'flex',
          margin: props.x !== 'center' && '0 1em',
          // pointerEvents: 'none',
        }}
        src={
          props.state.data
            ? `https://openweathermap.org/img/w/${props.state.data.weather[0].icon}.png`
            : undefined
        }
        alt={props.state.data.weather[0].description}
        title={
          props.state.data.weather[0].description
            .split(' ')
            .map((a) => a[0].toUpperCase() + a.slice(1))
            .join(' ') || undefined
        }
        onLoad={() => props.handleBool('loadingImage', false)}
        onError={() => {
          props.handleBool('loadingImage', false);
          console.log("Weather icon couldn't load");
        }}
      />
    </div>
  );
};

export default Weather;
