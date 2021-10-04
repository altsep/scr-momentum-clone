import { useState, useEffect, useRef } from "react";

export const useLoaderText = (bool, size, text) => {
  const [state, setState] = useState((text || "Loading") + ".");
  const ref = useRef(state);
  useEffect(() => {
    let intervalId = setInterval(
      () =>
        setState((state) =>
          bool && state.length < ref.current.length + 2
            ? state + "."
            : ref.current
        ),
      250
    );
    return () => clearInterval(intervalId);
  }, [bool, text]);
  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: size || "0.7em",
          textAlign: "start",
          width: "6.5em",
        }}
      >
        {state}
      </p>
    </div>
  );
};
