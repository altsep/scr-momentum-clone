import { useState, useEffect } from "react";

export const useLoaderText = (bool, size, align, width) => {
  const [state, setState] = useState(".");
  useEffect(() => {
    setState("Loading.");
    let intervalId = setInterval(
      () =>
        setState((state) =>
          bool && state.length < 10 ? state + "." : "Loading."
        ),
      500
    );
    return () => clearInterval(intervalId);
  }, [bool]);
  return (
    <p
      style={{
        fontSize: size || "0.7em",
        textAlign: align || "start",
        width: width || "5.5em",
      }}
    >
      {state}
    </p>
  );
};
