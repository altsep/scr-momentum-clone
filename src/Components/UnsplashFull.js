import NamePlusInput from './NamePlusInput';

export const LocationFull = props => {
  const { state, theme } = props;
  return (
    <div
      style={{
        placeSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NamePlusInput {...props} />
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
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: state.data.user.profile_image.medium
                  ? 'center'
                  : 'start',
              }}
            >
              <a
                className='unsplash-link'
                href={
                  state.data.user.instagram_username
                    ? `https://www.instagram.com/${state.data.user.instagram_username}`
                    : undefined
                }
                target='_blank'
                rel='noreferrer'
                style={{
                  color: theme.color,
                  textDecoration: !state.data.user.instagram_username && 'none',
                }}
              >
                {state.data.user
                  ? state.data.user.instagram_username || state.data.user.name
                  : '?'}
              </a>
              <a
                className='unsplash-link'
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
                  color: theme.color,
                  fontSize: '0.7em',
                  marginTop:
                    (state.data.exif.make || state.data.exif.model) && 10,
                }}
              >
                {!/canon|nikon/i.test(state.data.exif.make) &&
                  typeof state.data.exif.make === 'string' && (
                    <p>{state.data.exif.make}&nbsp;</p>
                  )}
                <p>{state.data.exif.model}</p>
              </a>
              <a
                className='unsplash-link'
                href={state.data.links.html}
                target='_blank'
                rel='noreferrer'
                style={{
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
              marginLeft: !state.error && 20,
            }}
          >
            <img
              className='unsplash-link__image'
              src={state.data.user.profile_image.medium}
              alt=''
              style={{ opacity: !state.data.user.instagram_username && 0.8 }}
            />
          </a>
        </div>
      )}
    </div>
  );
};
