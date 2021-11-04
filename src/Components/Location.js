import React, { useContext } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { ItemContext } from './Item';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import NamePlusInput from './NamePlusInput';

function Location() {
  const { unsplashState: state, setUnsplashName } = useContext(Context);
  const { id, x, canDrop, flexStyleX } = useContext(ItemContext);
  const loaderText = useLoaderText(state.loadingImage, x === 'center' && '1em');
  const { theme } = useContext(Context);
  const { ErrorMessage, errorDisplay } = useErrorMessage(state);

  return (
    <div
      id='location'
      className='details'
      style={Object.assign(
        {
          placeSelf: (canDrop || x === 'center') && 'center',
          width:
            state.loadingImage || canDrop ? '6em' : x === 'center' && '600px',
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
      {state.loading || (state.data !== null && state.loadingImage)
        ? loaderText
        : state.data !== null &&
          !state.loadingImage &&
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
      width: '80%',
      height: '80%',
    }}
  >
    <NamePlusInput
      id={id}
      x={x}
      state={state}
      setQuery={setQuery}
      titleText={state.data.location.title || '?'}
      theme={theme}
      char={char}
    />
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
              cursor:
                state.data.user &&
                state.data.user.instagram_username &&
                'pointer',
              textDecoration: 'none',
              color: theme.color,
            }}
          >
            {state.data.user
              ? state.data.user.instagram_username || state.data.user.name
              : '?'}
          </a>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              fontSize: '0.7em',
              marginTop: 10,
            }}
          >
            {!/canon|nikon/i.test(state.data.exif.make) &&
              typeof state.data.exif.make === 'string' && (
                <p>{state.data.exif.make}&nbsp;</p>
              )}
            <p>{state.data.exif.model}</p>
          </div>
        </div>
      </div>
      <img
        style={{
          gridColumn: '2 / 3',
          gridRow: '2 / 3',
          opacity: 0.8,
          marginLeft: 20,
        }}
        src={state.data.user.profile_image.medium}
        alt=''
      />
    </div>
  </div>
);

const LocationSmall = ({ id, x, state, theme, setQuery, char, flexStyleX }) => (
  <div style={{ placeSelf: flexStyleX }}>
    <NamePlusInput
      id={id}
      x={x}
      state={state}
      setQuery={setQuery}
      titleText={state.data.location.title || '?'}
      theme={theme}
      char={char}
    />
  </div>
);

export default Location;
