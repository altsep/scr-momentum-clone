import { Logo } from './CryptoLogo';
import NamePlusInput from './NamePlusInput';
import { Details } from './CryptoDetails';

export const CryptoSmall = ({
  x,
  flexStyleX,
  flexStyleY,
  windowSmall,
  state,
  theme,
  handleBool,
  handleHovered,
  hovered,
  setCryptoName,
}) => (
  <div
    className='crypto-normal'
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: flexStyleX,
      justifyContent: flexStyleY,
    }}
  >
    <div
      className='title'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: flexStyleY,
        alignItems: 'center',
      }}
    >
      {state.data && (
        <a
          className='crypto-homepage'
          href={state.data && state.data.links.homepage[0]}
          target='_blank'
          rel='noreferrer'
          style={{
            color: theme.color,
            display: 'grid',
          }}
          onMouseEnter={() => handleHovered('logo', true)}
          onMouseLeave={() => handleHovered('logo', false)}
        >
          <Logo
            state={state}
            handleBool={handleBool}
            hovered={hovered}
            x={x}
            size='thumb'
          />
        </a>
      )}
      &nbsp;
      <NamePlusInput
        state={state}
        setQuery={setCryptoName}
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
      {state.data && (
        <Details
          state={state}
          handleHovered={handleHovered}
          hovered={hovered}
          x={x}
          currencyName={state.data.id}
          windowSmall={windowSmall}
        />
      )}
    </div>
  </div>
);
