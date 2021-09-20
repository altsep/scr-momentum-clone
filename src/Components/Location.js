import React, { useContext } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "../App";
import { ItemContext } from "./Item";
import { errorMessage } from "../Misc/minorElements";

function Location() {
  const { backgroundImageState } = useContext(Context);
  const { x } = useContext(ItemContext);
  const state = backgroundImageState;
  const loaderText = useLoaderText(state.loadingImage);
  
  return (
    <div
      id="location"
      style={{
        margin: 10,
        width: x === "center" && "90vw",
        fontSize: x === "center" ? "1.4em" : "0.7em",
        textAlign: x === "center" ? x : x === "right" && x,
      }}
    >
      {state.error
        ? (() => {
            console.log(`Location: ${state.error}`);
            return errorMessage;
          })()
        : state.loadingImage
        ? loaderText
        : state.data !== null &&
          !state.loadingImage &&
          !Object.keys(state).includes("errors") &&
          !state.error &&
          typeof state.data.location.title === "string"
        ? state.data.location.title
        : "?"}
    </div>
  );
}

export default Location;
