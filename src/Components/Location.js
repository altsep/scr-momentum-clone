import React, { useContext } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";

function Location() {
  const { backgroundImageData } = useContext(Context);
  const { x, canDrop } = useContext(ItemContext);
  const state = backgroundImageData.state;
  const loaderText = useLoaderText(state.loadingImage);

  return (
    <div
      id="location"
      style={{
        placeSelf: (canDrop || x === "center") && "center",
        margin: 10,
        width: state.loadingImage || canDrop ? "6em" : x === "center" && "90vw",
        fontSize: x === "center" ? "1.4em" : "0.7em",
        textAlign: state.loadingImage
          ? "start"
          : (canDrop || x === "center")
          ? x
          : x === "right" && x,
      }}
    >
      {state.error
        ? (() => {
            console.log(`Location — ${state.error}`);
            return "Couldn't load background image.";
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
