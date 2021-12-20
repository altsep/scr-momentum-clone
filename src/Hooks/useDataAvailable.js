import { useState, useEffect } from 'react';

export const useDataAvailable = (...deps) => {
  const [bool, setBool] = useState(false);
  useEffect(
    () => (Array(deps).every(a => a) ? setBool(true) : setBool(false)),
    [deps]
  );
  return bool;
};
