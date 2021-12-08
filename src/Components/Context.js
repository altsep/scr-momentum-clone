import React, { useState, useEffect } from 'react';
import { useFetch } from '../Hooks/useFetch';

const Provider = (props) => {
  // fetch unsplash
  const [unsplashName, setUnsplashName] = useState('');
  const [unsplashUrl, setUnsplashUrl] = useState('');

  const { state, setState, handleBool } = useFetch(unsplashUrl);

  const unsplashUrlTemp =
    'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape';
  useEffect(() => {
    const item = localStorage.getItem('imageThemeName');
    if (item) {
      setUnsplashUrl(unsplashUrlTemp + `&query=${item}`);
    } else setUnsplashUrl(unsplashUrlTemp);
  }, []);

  useEffect(() => {
    if (unsplashName) {
      fetch(unsplashUrlTemp + `&query=${unsplashName}`)
        .then((a) => a.json())
        .then((b) => {
          if (b.errors) throw Error(b.errors);
          else {
            setUnsplashUrl(unsplashUrlTemp + `&query=${unsplashName}`);
            localStorage.setItem('imageThemeName', unsplashName);
          }
        })
        .catch((err) =>
          setState((s) => ({ ...s, error: true, errorDetails: err.message }))
        );
    }
  }, [setState, unsplashName]);

  // Handling initial loader to display elements after timeout in error scenario and to display the loader just once
  const [awkwardLoading, setAwkwardLoading] = useState(true);
  const [pseudoLoadingTimeout, setPseudoLoadingTimeout] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => setPseudoLoadingTimeout(false), 5000);
    // Use clean-up function to make the process repeatable
    return () => clearTimeout(timeoutId);
  }, [pseudoLoadingTimeout]);

  // Theming to accomodate initial loader and possible failure to either fetch location or load image. Used instead of a backup image
  const [theme, setTheme] = useState({});

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
    awkwardLoading && (state.loadingImage || error)
      ? setTheme(themes.awkward)
      : !error && url && setTheme(themes.normal);
  }, [awkwardLoading, state.loadingImage, state.data, error]);

  // State for info element that is used in main component
  const [infoStatus, setInfoStatus] = useState('initial');

  return (
    <Context.Provider
      value={{
        state,
        handleBool,
        setUnsplashName,
        awkwardLoading,
        setAwkwardLoading,
        pseudoLoadingTimeout,
        setPseudoLoadingTimeout,
        theme,
        themes,
        infoStatus,
        setInfoStatus,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const Context = React.createContext(null);

export { Context, Provider };
