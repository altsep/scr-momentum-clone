import React, { useContext, useState } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { ItemContext } from './Item';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import NamePlusInput from './NamePlusInput';
import { IconReddit, IconTwitter } from '../Misc/Icons';

function Crypto() {
  const {
    cryptoState: state,
    handleCryptoBool: handleBool,
    theme,
    cryptoName,
  } = useContext(Context);

  const { id, x, canDrop, flexStyleX } = useContext(ItemContext);

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
      id='crypto'
      style={{
        placeSelf: (canDrop || x === 'center') && 'center',
        display: 'grid',
      }}
    >
      {state.loading
        ? loaderText
        : state.data &&
          !state.loading &&
          (x === 'center' ? (
            <div
              className='crypto-center'
              style={{
                placeSelf: 'center',
                display: 'grid',
                gridTemplateColumns: '1fr 50px',
                gridTemplateRows: '2fr 1fr',
                width: '450px',
                gap: 30,
              }}
            >
              <div
                className='title'
                style={{
                  gridColumn: '2 / 3',
                  gridRow: '1 / 2',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.2em',
                }}
              >
                <a
                  style={{
                    alignSelf: 'start',
                  }}
                  href={state.data.links && state.data.links.homepage[0]}
                  target='_blank'
                  rel='noreferrer'
                  onMouseEnter={() => handleHovered('logo', true)}
                  onMouseLeave={() => handleHovered('logo', false)}
                >
                  <Logo
                    state={state}
                    handleBool={handleBool}
                    hovered={hovered}
                    x={x}
                    size='small'
                  />
                </a>
                <NamePlusInput
                  id={id}
                  x={x}
                  state={state}
                  setQuery={cryptoName[1]}
                  titleText={state.data.name}
                  theme={theme}
                  char='c'
                />
              </div>
              <div
                style={{
                  alignSelf: 'start',
                  gridColumn: '2 / 3',
                  gridRow: '2 / 3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <a
                  className='crypto-icon-link'
                  href={`https://twitter.com/${state.data.links.twitter_screen_name}`}
                  target='_blank'
                  rel='noreferrer'
                  style={iconStyle(hovered.twitter, theme)}
                  onMouseEnter={() => handleHovered('twitter', true)}
                  onMouseLeave={() => handleHovered('twitter', false)}
                >
                  <IconTwitter hovered={hovered.twitter} theme={theme} />
                </a>
                <a
                  className='crypto-icon-link'
                  href={state.data.links.subreddit_url}
                  target='_blank'
                  rel='noreferrer'
                  style={iconStyle(hovered.reddit, theme)}
                  onMouseEnter={() => handleHovered('reddit', true)}
                  onMouseLeave={() => handleHovered('reddit', false)}
                >
                  <IconReddit hovered={hovered.reddit} theme={theme} />
                </a>
              </div>
              <div
                className='crypto center details'
                style={{
                  placeSelf: 'start',
                  gridColumn: '1 / 2',
                  gridRow: '1 / 2',
                  width: '250px',
                  fontSize: '2em',
                }}
              >
                <Details
                  state={state}
                  handleHovered={handleHovered}
                  hovered={hovered}
                  x={x}
                  currencyName={state.data.id}
                />
              </div>
              <div
                className='crypto-description'
                style={{
                  placeSelf: 'start',
                  fontSize: '0.6em',
                  gridColumn: '1 / 2',
                  gridRow: '2 / 3',
                }}
              >
                {state.data.public_notice !== null ? (
                  <div>
                    <h4>Public notice:</h4>
                    <p style={{ marginTop: 5 }}>{state.data.public_notice}</p>
                  </div>
                ) : (
                  state.data.description.en !== null && (
                    <div>
                      <h4>Description:</h4>
                      <p style={{ marginTop: 5 }}>
                        {state.data.description.en.match(/[\w\s;-]*\./)[0]}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div
              className='crypto-normal'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: flexStyleX,
              }}
            >
              <div
                className='title'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: flexStyleX,
                  alignItems: 'center',
                }}
                onMouseEnter={() => handleHovered('logo', true)}
                onMouseLeave={() => handleHovered('logo', false)}
              >
                <a
                  className='crypto-homepage'
                  href={state.data.links.homepage[0]}
                  target='_blank'
                  rel='noreferrer'
                  style={{
                    color: theme.color,
                    display: 'grid',
                  }}
                >
                  <Logo
                    state={state}
                    handleBool={handleBool}
                    hovered={hovered}
                    x={x}
                    size='thumb'
                  />
                </a>
                &nbsp;
                <NamePlusInput
                  id={id}
                  x={x}
                  state={state}
                  setQuery={cryptoName[1]}
                  titleText={state.data.name}
                  theme={theme}
                  char='c'
                />
              </div>
              <div
                className='crypto-details-container'
                style={{
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                <Details
                  state={state}
                  handleHovered={handleHovered}
                  hovered={hovered}
                  x={x}
                  currencyName={state.data.id}
                />
              </div>
            </div>
          ))}
      {state.error && errorDisplay && (
        <ErrorMessage
          x={x}
          theme={theme}
          style={{ marginTop: state.data ? 10 : '', justifySelf: flexStyleX }}
        />
      )}
    </div>
  );
}

const Logo = ({ state, handleBool, hovered, size, x }) => (
  <img
    src={state.data.image[size]}
    alt=''
    onLoad={() => handleBool('loadingImage', false)}
    onError={() => handleBool('loadingImage', false)}
    style={Object.assign(
      {
        transform: hovered.logo && 'rotate(-30deg)',
        pointerEvents: 'none',
      },
      x === 'center' && {
        width: 40,
        height: 40,
      }
    )}
  />
);

const Details = ({ state, handleHovered, hovered, x, currencyName }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr',
        gap: 20,
      }}
      onMouseEnter={() => handleHovered('details', true)}
      onMouseLeave={() => handleHovered('details', false)}
    >
      <div
        className={`crypto details ${x}`}
        style={{
          gridColumn: x === 'right' ? '2 / 3' : '1 / 2',
          gridRow: '1 / 2',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>
          {state.data.market_data.current_price.usd
            ? state.data.market_data.current_price.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: currencyName === 'bitcoin' ? 0 : 8,
              })
            : ''}
        </p>
        <p>
          {state.data.market_data.high_24h.usd
            ? state.data.market_data.high_24h.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: currencyName === 'bitcoin' ? 0 : 8,
              })
            : ''}
        </p>
        <p>
          {state.data.market_data.low_24h.usd
            ? state.data.market_data.low_24h.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: currencyName === 'bitcoin' ? 0 : 8,
              })
            : ''}
        </p>
      </div>
      <div
        className={`crypto details ${x}`}
        style={{
          gridColumn: x === 'right' ? '1 / 2' : '2 / 3',
          gridRow: '1 / 2',
          isplay: 'flex',
          flexDirection: 'column',
          opacity: hovered.details ? 0.8 : 0,
        }}
      >
        <p>Current</p>
        <p>High</p>
        <p>Low</p>
      </div>
    </div>
  );
};

const iconStyle = (hovered, theme) =>
  hovered
    ? {
        backgroundColor:
          theme.name === 'normal'
            ? 'rgba(43, 43, 43, 0.6)'
            : 'rgba(237, 237, 237, 0.6)',
        padding: 5,
        borderRadius: '50%',
      }
    : { padding: 5 };

export default Crypto;
