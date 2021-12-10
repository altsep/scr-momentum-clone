import NamePlusInput from './NamePlusInput';

export const WeatherSmall = ({ props }) => {
  const {
    state,
    temp,
    wind,
    x,
    flexStyleX,
    flexStyleY,
    iconWithProps,
    id,
    setQuery,
    theme,
    char,
    handleClick,
    windowSmall,
  } = props;
  return (
    <div
      className='weather'
      style={{
        width: windowSmall || !state.data ? '100%' : '7em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: flexStyleY,
        alignItems: flexStyleX,
        textAlign: flexStyleX,
        padding: 0,
      }}
    >
      <div className='weather title'>
        <NamePlusInput
          id={id}
          x={x}
          state={state}
          setQuery={setQuery}
          theme={theme}
          char={char}
        />
      </div>
      <div
        style={{
          lineHeight: 1.5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: flexStyleX,
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        {iconWithProps}
        {state.data && (
          <div
            className='weather details'
            style={{
              marginTop: 10,
              fontWeight: '100',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: flexStyleY,
              alignItems: windowSmall ? 'flex-start' : flexStyleX,
            }}
          >
            <p>{temp}</p>
            <p>{state.data.weather[0].main}</p>
            <p>{wind}</p>
          </div>
        )}
      </div>
    </div>
  );
};
