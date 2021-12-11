import NamePlusInput from './NamePlusInput';

export const LocationSmall = ({
  state,
  theme,
  setQuery,
  char,
  flexStyleX,
}) => (
  <div style={{ placeSelf: flexStyleX }}>
    <NamePlusInput
      state={state}
      setQuery={setQuery}
      theme={theme}
      char={char}
    />
  </div>
);
