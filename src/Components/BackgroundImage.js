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

  const [pseudoLoadingTimeout] = useContext(Context).pseudoLoadingTimeout;
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Determite initial loader's fate
  useEffect(() => {
    if (
      (!state.loadingImage && typeof url === "string") ||
      (pseudoLoadingTimeout === false && state.loadingImage === false)
    ) {
      setAwkwardLoading(false);
      setLoadingTimeout(false);
    }
    setTimeout(() => {
      setAwkwardLoading(false);
      !state.loadingImage && typeof url !== "string" && setLoadingTimeout(true);
    }, 5000);
  }, [state.loadingImage, url, pseudoLoadingTimeout, setAwkwardLoading]);

  const loaderText = useLoaderText(awkwardLoading, "1.5rem");

  return (
    <>
      {awkwardLoading && (
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
      )}
      {(awkwardLoading || loadingTimeout) && (
        <div
          style={{
            zIndex: "1",
            position: "absolute",
            bottom: 250,
            left: "50%",
            transform: "translateX(-50%)",
            textTransform: "lowercase",
            width: "6em",
            color: "#2b2b2b",
            textShadow: "2px 2px 2px #eaeaea",
          }}
        >
          {loadingTimeout ? "Timed out." : awkwardLoading && loaderText}
        </div>
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
