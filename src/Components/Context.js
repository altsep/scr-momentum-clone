import React, { useState, useEffect } from 'react';
import { useFetch } from '../Hooks/useFetch';

const Provider = (props) => {
  // fetch unsplash
  const [unsplashName, setUnsplashName] = useState('');
  const [unsplashUrl, setUnsplashUrl] = useState('');
  const [unsplashItem, setUnsplashItem] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedCueDisplay, setSavedCueDisplay] = useState(false);

  const { state, setState, handleBool } = useFetch(unsplashUrl);

  const unsplashUrlTemp =
    'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape';
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('imageSaved'));
    const keyword = localStorage.getItem('imageThemeName');
    if (saved) {
      setState((s) => ({ ...s, data: saved }));
      setIsSaved(true);
    } else if (keyword) setUnsplashUrl(unsplashUrlTemp + `&query=${keyword}`);
    else {
      setUnsplashUrl(unsplashUrlTemp);
    }
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('imageSaved'));
    setUnsplashItem(saved);
  }, [isSaved]);

  const handleUnsplashSaved = () => {
    const item = JSON.parse(localStorage.getItem('imageSaved'));
    if (item) {
      localStorage.removeItem('imageSaved');
      setIsSaved(false);
    } else if (state.data) {
      localStorage.setItem('imageSaved', JSON.stringify(state.data));
      setIsSaved(true);
      setSavedCueDisplay(true);
      setTimeout(() => setSavedCueDisplay(false), 2000);
    }
  };

  const handleUnsplashRestore = () => {
    const item = JSON.parse(localStorage.getItem('imageSaved'));
    item && setState((s) => ({ ...s, data: item }));
  };

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
      border: 'solid 2px #2b2b2b4d',
    },
  };

  const [theme, setTheme] = useState(themes.normal);

  const error = state.error;
  const url = state.data && state.data.urls.regular;
  useEffect(() => {
    // Dark text during load
    // awkwardLoading && (state.loadingImage || error)
    //   ? setTheme(themes.awkward)
    awkwardLoading || (!error && url)
      ? setTheme(themes.normal)
      : setTheme(themes.awkward);
  }, [awkwardLoading, error, url]);

  // State for info element that is used in main component
  const [infoStatus, setInfoStatus] = useState('initial');

  return (
    <Context.Provider
      value={{
        state,
        handleBool,
        unsplashUrlTemp,
        setUnsplashName,
        unsplashUrl,
        setUnsplashUrl,
        unsplashItem,
        handleUnsplashSaved,
        handleUnsplashRestore,
        savedText: isSaved,
        savedCue: savedCueDisplay,
        setSavedCue: setSavedCueDisplay,
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
