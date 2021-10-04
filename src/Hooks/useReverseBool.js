import { useState, useEffect } from "react";

export const useReverseBool = (value = false) => {
  const [bool, setBool] = useState(value);

  const reverseBool = (bool) => setBool((state) => bool || !state);

  return { bool, reverseBool };
};
