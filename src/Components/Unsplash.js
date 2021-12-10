import React, { useContext } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { ItemContext } from './Item';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import { LocationFull } from './UnsplashFull';
import { LocationSmall } from './UnsplashSmall';

function Location() {
  const {
    awkwardLoading,
    theme,
    state,
    setUnsplashName,
    handleUnsplashSaved,
    handleUnsplashRestore,
    unsplashItem,
    savedText,
  } = useContext(Context);
  const { id, x, canDrop, flexStyleX } = useContext(ItemContext);
  const loaderText = useLoaderText(state.loadingImage, x === 'center' && '1em');
  const { ErrorMessage, errorDisplay } = useErrorMessage(state);
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
              handleSaved={handleUnsplashSaved}
            />
          ))}
      {state.data && !state.loadingImage && (
        <div
          style={{
            color: theme.color + 'cc',
            cursor: 'pointer',
            marginLeft: 10,
            fontSize: '0.7rem',
            marginTop: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p
            className='unsplash-link'
            onClick={handleUnsplashSaved}
            onMouseEnter={(e) => {
              if (savedText === 'Saved!') e.target.innerHTML = 'Forget';
            }}
            onMouseLeave={(e) => (e.target.innerHTML = savedText)}
          >
            {savedText}
          </p>
          <p
            className='unsplash-link'
            style={{ marginLeft: 10 }}
            onClick={handleUnsplashRestore}
          >
            {unsplashItem && state.data.id !== unsplashItem.id && 'Restore'}
          </p>
        </div>
      )}
      {state.error && !state.data && errorDisplay ? (
        <ErrorMessage text="Couldn't load image data" theme={theme} />
      ) : (
        state.error && errorDisplay && <ErrorMessage theme={theme} />
      )}
    </div>
  );
}

export default Location;
