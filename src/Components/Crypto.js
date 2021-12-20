import React, { useState, useEffect } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import { CryptoFull } from './CryptoFull';
import { CryptoSmall } from './CryptoSmall';
import { useFetch } from '../Hooks/useFetch';

function Crypto(props) {
  const { theme, x, flexStyleX, flexStyleY, windowSmall } = props;

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
        .then(a => {
          if (a.ok) {
            localStorage.setItem('cryptoCurrencyName', cryptoName);
            setCryptoFetchUrl(cryptoUrl);
          } else if (item && cryptoName !== item) {
            setCryptoName(item);
            throw Error(a.status);
          }
        })
        .catch(err => {
          setState(s => ({ ...s, error: true, errorDetails: err.message }));
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
    setHovered(state => {
      let result = { ...state };
      result[key] = bool;
      return result;
    });
  };

  const { ErrorMessage, errorDisplay } = useErrorMessage(state);

  const childProps = {
    ...props,
    theme,
    state,
    handleBool,
    handleHovered,
    hovered,
    setQuery: setCryptoName,
    char: 'c',
  };

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
        <CryptoFull {...childProps} />
      ) : (
        <CryptoSmall {...childProps} />
      )}
      {state.error && errorDisplay && <ErrorMessage theme={theme} />}
    </div>
  );
}

export default Crypto;
