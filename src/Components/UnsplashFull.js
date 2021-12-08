import NamePlusInput from './NamePlusInput';

export const LocationFull = ({ id, x, state, setQuery, theme, char }) => (
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
  </div>
);
