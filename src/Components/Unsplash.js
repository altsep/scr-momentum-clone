import React, { useContext } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { ItemContext } from './Item';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import NamePlusInput from './NamePlusInput';

function Location() {
  const { awkwardLoading, theme, state, setUnsplashName } = useContext(Context);
  const { id, x, canDrop, flexStyleX } = useContext(ItemContext);
  const loaderText = useLoaderText(state.loadingImage, x === 'center' && '1em');
  const { ErrorMessage, errorDisplay } = useErrorMessage(state);
  console.log(state);
  return (
    <div
      id='location'
      className='details'
      style={Object.assign(
        {
          placeSelf: (canDrop || x === 'center') && 'center',
          width:
            state.loadingImage || canDrop ? '6em' : x === 'center' && '12em',
          textAlign: flexStyleX,
          fontSize: '1em',
          display: 'grid',
        },
        x === 'center' && {
          fontSize: '1.4em',
          display: 'grid',
          height: '100%',
        }
      )}
    >
      {!awkwardLoading && state.loadingImage
        ? loaderText
        : !awkwardLoading &&
          (x === 'center' ? (
            <LocationFull
              id={id}
              x={x}
              state={state}
              setQuery={setUnsplashName}
              theme={theme}
              char='l'
            />
          ) : (
            <LocationSmall
              id={id}
              x={x}
              state={state}
              setQuery={setUnsplashName}
              theme={theme}
              char='l'
              flexStyleX={flexStyleX}
            />
          ))}
      {state.error && !state.data && errorDisplay ? (
        <ErrorMessage text="Couldn't load image data" theme={theme} />
      ) : (
        state.error && errorDisplay && <ErrorMessage theme={theme} />
      )}
    </div>
  );
}

const LocationFull = ({ id, x, state, setQuery, theme, char }) => (
  <div
    style={{
      placeSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <NamePlusInput
      id={id}
      x={x}
      state={state}
      setQuery={setQuery}
      theme={theme}
      char={char}
    />
    {state.data && (
      <div
        className='border-line details'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 20,
          paddingTop: 20,
          borderTop: theme.border,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '0.7em',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <a
              href={
                state.data.user.instagram_username
                  ? `https://www.instagram.com/${state.data.user.instagram_username}`
                  : undefined
              }
              target='_blank'
              rel='noreferrer'
              style={{
                textDecoration: 'none',
                color: theme.color,
              }}
            >
              {state.data.user
                ? state.data.user.instagram_username || state.data.user.name
                : '?'}
            </a>
            <a
              href={`https://www.google.com/search?q=${
                !/canon|nikon/i.test(state.data.exif.make) &&
                typeof state.data.exif.make === 'string'
                  ? state.data.exif.make + ' '
                  : ''
              }${state.data.exif.model}`}
              target='_blank'
              rel='noreferrer'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                textDecoration: 'none',
                color: theme.color,
                fontSize: '0.7em',
                marginTop: 10,
              }}
            >
              {!/canon|nikon/i.test(state.data.exif.make) &&
                typeof state.data.exif.make === 'string' && (
                  <p>{state.data.exif.make}&nbsp;</p>
                )}
              <p>{state.data.exif.model}</p>
            </a>
            <a
              href={state.data.links.html}
              target='_blank'
              rel='noreferrer'
              style={{
                textDecoration: 'none',
                color: theme.color,
                fontSize: '0.7em',
                marginTop: 10,
              }}
            >
              {state.data.links.html ? '[unsplash]' : undefined}
            </a>
          </div>
        </div>
        <a
          href={
            state.data.user.instagram_username
              ? `https://www.instagram.com/${state.data.user.instagram_username}`
              : undefined
          }
          target='_blank'
          rel='noreferrer'
          style={{
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
            opacity: 0.8,
            marginLeft: 20,
          }}
        >
          <img src={state.data.user.profile_image.medium} alt='' />
        </a>
      </div>
    )}
  </div>
);

const LocationSmall = ({ id, x, state, theme, setQuery, char, flexStyleX }) => (
  <div style={{ placeSelf: flexStyleX }}>
    <NamePlusInput
      id={id}
      x={x}
      state={state}
      setQuery={setQuery}
      theme={theme}
      char={char}
    />
  </div>
);

export default Location;
