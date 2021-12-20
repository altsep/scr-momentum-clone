import React, { useContext } from 'react';
import { useLoaderText } from '../Hooks/useLoaderText';
import { Context } from './Context';
import { useErrorMessage } from '../Hooks/useErrorMessage';
import { LocationFull } from './UnsplashFull';
import { LocationSmall } from './UnsplashSmall';

function Location(props) {
  const {
    awkwardLoading,
    state,
    setUnsplashName,
    handleUnsplashSaved,
    handleUnsplashRestore,
    unsplashItem,
    savedText: isSaved,
    savedCue: savedCueDisplay,
  } = useContext(Context);
  const { theme, x, y, canDrop, flexStyleX } = props;
  const loaderText = useLoaderText(state.loadingImage, x === 'center' && '1em');
  const { ErrorMessage, errorDisplay } = useErrorMessage(state);
  const childProps = {
    ...props,
    theme,
    state,
    setQuery: setUnsplashName,
    handleSaved: handleUnsplashSaved,
    char: 'l',
  };
  return (
    <div
      className='location'
      style={{
        placeSelf: (canDrop || x === 'center') && 'center',
        width: state.loadingImage || canDrop ? '6em' : x === 'center' && '12em',
        textAlign: flexStyleX,
        fontSize: '1em',
        display: 'grid',
      }}
    >
      {!awkwardLoading && state.loadingImage
        ? loaderText
        : !awkwardLoading &&
          (x === 'center' ? (
            <LocationFull {...childProps} />
          ) : (
            <LocationSmall {...childProps} />
          ))}
      {state.data && !state.loadingImage && (
        <div
          className='unsplash-storage-controls'
          style={{
            color: theme.color + 'cc',
            cursor: 'pointer',
            fontSize: '0.7rem',
            marginTop: y !== 'bottom' && 10,
            marginBottom: y === 'bottom' && 10,
            display: 'flex',
            justifyContent: x === 'center' ? x : flexStyleX,
            order: y === 'bottom' && -1,
          }}
        >
          <div>
            <p className='unsplash-link' onClick={handleUnsplashSaved}>
              {isSaved ? 'Forget' : 'Save'}
            </p>
            {savedCueDisplay && <p className='unsplash-saved-cue'>Saved!</p>}
          </div>
          {unsplashItem && state.data.id !== unsplashItem.id && (
            <p
              className='unsplash-link'
              style={{ marginLeft: 10 }}
              onClick={handleUnsplashRestore}
            >
              Restore
            </p>
          )}
        </div>
      )}
      {!state.data && errorDisplay ? (
        <ErrorMessage text="Couldn't load image data" theme={theme} />
      ) : (
        state.error && errorDisplay && <ErrorMessage theme={theme} />
      )}
    </div>
  );
}

export default Location;
