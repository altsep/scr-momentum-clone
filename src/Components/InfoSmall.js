export const InfoSmall = ({
  x,
  y,
  flexStyleX,
  theme,
  hovered,
  setHovered,
  infoStatus,
  setInfoStatus,
}) => {
  const bgColor =
    theme.name === 'awkward' ? theme.color + '10' : theme.color + '20';
  const bgColorHovered =
    theme.name === 'awkward' ? theme.color + '15' : theme.color + '60';
  return (
    <div
      className='info-title-full'
      style={Object.assign({
        display: 'grid',
        justifyItems: flexStyleX,
        rowGap: 20,
        fontSize: '1.5rem',
        color: theme.color || '#eae7e1',
      })}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <p
          className='info-link'
          style={{
            color: hovered ? theme.color + 'ff' : theme.color,
            fontSize: '0.8em',
            fontStyle: 'italic',
            backgroundColor: hovered ? bgColorHovered : bgColor,
            padding: 15,
            marginRight: x === 'right' && 55,
            marginLeft: x === 'left' && 55,
            order: y === 'top' && 1,
          }}
        >
          {infoStatus === 'initial' ? 'Display info...' : 'Return'}
        </p>
      )}
      <p
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 35,
          height: 35,
          backgroundColor: hovered ? bgColorHovered : bgColor,
          textDecoration: hovered && 'underline',
          cursor: 'pointer',
        }}
        onClick={() => {
          setInfoStatus((state) =>
            state === 'initial' ? 'expanded' : 'initial'
          );
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
      >
        I
      </p>
    </div>
  );
};
