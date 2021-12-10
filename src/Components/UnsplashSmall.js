import NamePlusInput from './NamePlusInput';

export const LocationSmall = ({
  id,
  x,
  state,
  theme,
  setQuery,
  char,
  flexStyleX,
}) => (
  <div style={{ placeSelf: flexStyleX }}>
    <NamePlusInput
      id={id}
      x={x}
      state={state}
      setQuery={setQuery}
      theme={theme}
      char={char}
    />
  </div>
);
