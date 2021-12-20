import NamePlusInput from './NamePlusInput';
import { IconReddit, IconTwitter } from '../Misc/Icons';
import { Details } from './CryptoDetails';
import { Logo } from './CryptoLogo';

export const CryptoFull = props => {
  const { x, canDrop, state, theme, handleBool, handleHovered, hovered } =
    props;
  return (
    <div
      className='crypto-center'
      style={{
        placeSelf: (canDrop || x === 'center') && 'center',
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
        }}
      >
        {state.data && (
          <a
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
        )}
        <NamePlusInput {...props} />
      </div>
      {state.data && (
        <>
          <div
            style={{
              gridColumn: '2 / 3',
            }}
          >
            <a
              className='crypto-icon-link'
              href={`https://twitter.com/${state.data.links.twitter_screen_name}`}
              target='_blank'
              rel='noreferrer'
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
              x={x}
              canDrop={canDrop}
              state={state}
              handleHovered={handleHovered}
              hovered={hovered}
              currencyName={state.data.id}
            />
          </div>
          {!canDrop && (
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
          )}
        </>
      )}
    </div>
  );
};
