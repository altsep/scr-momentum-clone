const ControlsSwitch = ({ props }) => {
  const { id, x, setActive, hover, text, icon, handleClick } = props;

  return (
    <div
      id='controls'
      style={Object.assign(
        {
          margin: x === 'center' ? '40px 0 0' : 10,
          order: x === 'right' && -1,
          alignSelf: id === 'weather' && x !== 'center' ? 'end' : 'center',
        },
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hover ? '0.9' : '0',
        },
        x === 'center' && {
          transform: 'scale(1.5)',
        }
      )}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      onClick={handleClick}
    >
      <p
        style={{
          fontSize: '0.6rem',
          marginRight: '0.25rem',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </p>
      {icon}
    </div>
  );
};

export default ControlsSwitch;
