import NamePlusInput from './NamePlusInput';

export const WeatherFull = ({ props }) => {
  const {
    state,
    temp,
    feels,
    wind,
    flexStyleX,
    flexStyleY,
    iconWithProps,
    setQuery,
    theme,
    char,
    handleClick,
  } = props;
  return (
    <div
      className='weather'
      style={{
        width: '19em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: flexStyleX,
        alignItems: flexStyleY,
        textAlign: flexStyleX,
        padding: 0,
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: flexStyleX,
        }}
      >
        <p
          style={{
            fontSize: '3em',
            fontWeight: '700',
          }}
          onClick={handleClick}
        >
          {temp}
        </p>
        <div
          className='weather details'
          style={{
            marginTop: 10,
            fontSize: '0.7em',
            fontWeight: '100',
            display: 'flex',
          }}
          onClick={handleClick}
        >
          {state.data && 'Feels like ' + feels}
        </div>
        <div
          className='weather border-line'
          style={{
            marginTop: state.data && 30,
            paddingTop: state.data && 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTop: state.data && theme.border,
          }}
        >
          <NamePlusInput
            state={state}
            setQuery={setQuery}
            theme={theme}
            char={char}
          />
          {iconWithProps}
        </div>
      </div>
      {state.data && (
        <div
          className='weather details border-line'
          style={{
            marginLeft: 30,
            paddingLeft: 30,
            fontSize: '1em',
            fontWeight: '100',
            lineHeight: 2,
            display: state.data ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: flexStyleY,
            borderLeft: theme.border,
            width: '50%',
            textAlign: 'start',
          }}
          onClick={handleClick}
        >
          <p
            style={{
              width: '6em',
              textTransform: 'capitalize',
            }}
          >
            {state.data.weather[0].description}
          </p>
          <p>{wind}</p>
          <p>{state.data.main.humidity}%</p>
          <p>{state.data.main.pressure}hPa</p>
        </div>
      )}
    </div>
  );
};
