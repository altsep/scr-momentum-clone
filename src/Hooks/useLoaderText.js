import { useState, useEffect } from "react";

export const useLoaderText = (loadingStatus) => {
  const [state, setState] = useState(".");
  useEffect(() => {
    setState("Loading.");
    let intervalId = setInterval(
      () =>
        loadingStatus &&
        setState((state) => {
          return state.length < 10 ? state + "." : "Loading.";
        }),
      500
    );
    return () => clearInterval(intervalId);
  }, [loadingStatus]);
  return state;
};
