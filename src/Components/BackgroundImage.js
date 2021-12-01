import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context } from './Context';
import awkward from '../awkward.gif';
import { useLoaderText } from '../Hooks/useLoaderText';

function Background() {
  const [url, setUrl] = useState();
  const { unsplash: state, handleUnsplashBool: handleBool } =
    useContext(Context);

  // Urls object keys:
  // raw, full, regular, small, thumb
  useEffect(() => {
    state.data && setUrl(state.data.urls.regular);
  }, [state.data]);

  // Provide initial loader
  const [awkwardLoading, setAwkwardLoading] =
    useContext(Context).awkwardLoading;

  const [pseudoLoadingTimeout] = useContext(Context).pseudoLoadingTimeout;
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Determite initial loader's fate
  useEffect(() => {
    if (
      (!state.loadingImage && typeof url === 'string') ||
      (pseudoLoadingTimeout === false && state.loadingImage === false)
    ) {
      setAwkwardLoading(false);
      setLoadingTimeout(false);
    }
    const timeoutId = setTimeout(() => {
      setAwkwardLoading(false);
      !state.loadingImage &&
      typeof url !== 'string' &&
      state.errorDetails === 'Failed to fetch'
        ? setLoadingTimeout(true)
        : setLoadingTimeout(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [state.loadingImage, url, pseudoLoadingTimeout, setAwkwardLoading]);

  const loaderText = useLoaderText(awkwardLoading, '1.5rem');

  // Handle keyboard controls
  const doublePressRef = useRef(false);
  const doublePressRefAvailable = useRef(true);

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.key.toLowerCase() === 'b' && !doublePressRef.current) {
        doublePressRef.current = true;
        setTimeout(() => (doublePressRef.current = false), 300);
      } else if (
        e.key.toLowerCase() === 'b' &&
        doublePressRef.current &&
        doublePressRefAvailable.current
      ) {
        handleBool('active', null, true);
        doublePressRef.current = false;
        doublePressRefAvailable.current = false;
        setTimeout(() => (doublePressRefAvailable.current = true), 500);
      }
    };
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <>
      {awkwardLoading && (
        <img
          id='background'
          style={{
            zIndex: '0',
            userSelect: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            filter: 'contrast(200%) grayscale(100%)',
          }}
          src={awkward}
          alt=''
        />
      )}
      {(awkwardLoading || loadingTimeout) && (
        <div
          style={{
            zIndex: '1',
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            textTransform: 'lowercase',
            width: '6em',
            color: '#2b2b2b',
            textShadow: '2px 2px 2px #eaeaea',
          }}
        >
          {loadingTimeout ? 'Timed out.' : awkwardLoading && loaderText}
        </div>
      )}
      <img
        id='background'
        hidden={!url}
        style={{
          zIndex: '0',
          position: 'absolute',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          userSelect: 'none',
        }}
        src={
          state.data && typeof state.data.urls.regular === 'string'
            ? url
            : undefined
        }
        alt=''
        onLoad={() => {
          handleBool('loadingImage', false);
        }}
        onError={(e) => {
          handleBool('loadingImage', false);
          handleBool('error', true);
          handleBool('errorDetails', "Couldn't load image");
          // e.target.onerror = null;
          // e.target.src = lake;
        }}
        onDoubleClick={() => handleBool('active', null, true)}
      />
      {state.error && (
        <div
          style={{
            zIndex: '0',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#00000080',
            textShadow: 'none',
            fontSize: '5rem',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            userSelect: 'none',
          }}
        >
          （゜;﹏;゜）
        </div>
      )}
    </>
  );
}

export default Background;
