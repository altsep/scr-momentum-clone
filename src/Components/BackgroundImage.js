import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import awkward from "../awkward.gif";
import { useLoaderText } from "../Hooks/useLoaderText";

function Background() {
  const [url, setUrl] = useState();
  const { unsplashState: state, handleUnsplashBool: handleBool } =
    useContext(Context);

  useEffect(() => {
    state.data && setUrl(state.data.urls.regular);
  }, [state.data]);

  // Provide initial loader
  const [awkwardLoading, setAwkwardLoading] =
    useContext(Context).awkwardLoading;

  const [loadingTimeout] = useContext(Context).loadingTimeout;

  // Determite initial loader's fate
  useEffect(() => {
    if (
      (!state.loadingImage && typeof url === "string") ||
      (loadingTimeout === false && state.loadingImage === false)
    )
      setAwkwardLoading(false);
  }, [state.loadingImage, url, loadingTimeout]);

  const loaderText = useLoaderText(awkwardLoading);

  return (
    <>
      {awkwardLoading && (
        <>
          <img
            id="background"
            style={{
              userSelect: "none",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.5)",
              filter: "contrast(200%) grayscale(100%)",
            }}
            src={awkward}
            alt=""
          />
          <p
            style={{
              position: "absolute",
              bottom: 200,
              left: "50%",
              transform: "translateX(-50%)",
              textTransform: "lowercase",
              width: "6em",
              color: "#2b2b2b",
              textShadow: "2px 2px 2px #eaeaea",
            }}
          >
            {awkwardLoading && loadingTimeout && loaderText}
          </p>
        </>
      )}
      <img
        id="background"
        hidden={!url}
        style={{
          zIndex: "0",
          position: "absolute",
          objectFit: "cover",
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
        src={
          state.data && typeof state.data.urls.regular === "string"
            ? url
            : undefined
        }
        alt=""
        onLoad={() => {
          handleBool("loadingImage", false);
        }}
        onError={() => {
          handleBool("loadingImage", false);
          handleBool("error", true);
          console.log("Couldn't load image.");
          // e.target.onerror = null;
          // e.target.src = lake;
        }}
        onDoubleClick={() => handleBool("active", null, true)}
      />
    </>
  );
}

export default Background;
