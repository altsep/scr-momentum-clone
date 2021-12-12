import React, { useContext, useState, useEffect } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import { ItemContext } from './Item';
import { CryptoFull } from './CryptoFull';
import { CryptoSmall } from './CryptoSmall';
import { useFetch } from '../Hooks/useFetch';

function Crypto() {
  const { theme } = useContext(Context);

  const { id, x, canDrop, flexStyleX, flexStyleY, windowSmall } =
    useContext(ItemContext);

  const [cryptoName, setCryptoName] = useState('');
  const cryptoUrl = `https://api.coingecko.com/api/v3/coins/${cryptoName}?localization=false&market_data=true`;
  const [cryptoFetchUrl, setCryptoFetchUrl] = useState('');
  const { state, setState, handleBool } = useFetch(cryptoFetchUrl);

  useEffect(() => {
    const item = localStorage.getItem('cryptoCurrencyName');
    setCryptoName(item ? item : 'bitcoin');
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('cryptoCurrencyName');
    if (cryptoName) {
      fetch(cryptoUrl)
        .then((a) => {
          if (a.ok) {
            localStorage.setItem('cryptoCurrencyName', cryptoName);
            setCryptoFetchUrl(cryptoUrl);
          } else if (item && cryptoName !== item) {
            setCryptoName(item);
            throw Error(a.status);
          }
        })
        .catch((err) => {
          setState((s) => ({ ...s, error: true, errorDetails: err.message }));
        });
    }
  }, [cryptoName, cryptoUrl, setState]);

  const loaderText = useLoaderText(state.loading, x === 'center' && '1.4em');

  const [hovered, setHovered] = useState({
    details: false,
    logo: false,
    twitter: false,
    reddit: false,
  });

  const handleHovered = (key, bool) => {
    setHovered((state) => {
      let result = { ...state };
      result[key] = bool;
      return result;
    });
  };

  const { ErrorMessage, errorDisplay } = useErrorMessage(state);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexStyleY,
        alignItems: flexStyleX,
        transform: windowSmall && 'scale(1.4)',
      }}
      onMouseEnter={() => handleHovered('details', true)}
      onMouseLeave={() => handleHovered('details', false)}
    >
      {state.loading ? (
        loaderText
      ) : x === 'center' ? (
        <CryptoFull
          x={x}
          canDrop={canDrop}
          state={state}
          theme={theme}
          handleBool={handleBool}
          handleHovered={handleHovered}
          hovered={hovered}
          setCryptoName={setCryptoName}
        />
      ) : (
        <CryptoSmall
          x={x}
          canDrop={canDrop}
          flexStyleX={flexStyleX}
          flexStyleY={flexStyleY}
          windowSmall={windowSmall}
          state={state}
          theme={theme}
          handleBool={handleBool}
          handleHovered={handleHovered}
          hovered={hovered}
          setCryptoName={setCryptoName}
        />
      )}
      {state.error && errorDisplay && <ErrorMessage />}
    </div>
  );
}

export default Crypto;
