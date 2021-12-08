export const Logo = ({ state, handleBool, hovered, size, x }) => (
  <img
    src={state.data.image[size]}
    alt=''
    onLoad={() => handleBool('loadingImage', false)}
    onError={() => handleBool('loadingImage', false)}
    style={Object.assign(
      {
        transform: hovered.logo && 'rotate(-30deg)',
        pointerEvents: 'none',
      },
      x === 'center' && {
        width: 40,
        height: 40,
      }
    )}
  />
);
