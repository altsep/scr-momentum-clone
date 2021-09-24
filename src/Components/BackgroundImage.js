import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import lake from "../lake.jpg";
import awkward from "../awkward.gif";
import { useLoaderText } from "../Hooks/useLoaderText";

function BackgroundImage() {
  const [url, setUrl] = useState();
  const { state, handleLoadingImage } = useContext(Context).backgroundImageData;

  useEffect(() => {
    state.data && setUrl(state.data.urls.regular);
  }, [state.data]);

  // Provide initial loader
  const [awkwardLoading, setAwkwardLoading] =
    useContext(Context).awkwardLoading;

  useEffect(() => {
    const main = document.getElementById("main").style;
    if (awkwardLoading) {
      main.color = "#2b2b2b";
      main.textShadow = "2px 2px 2px #eaeaea";
    } else {
      main.color = "#ededed";
      main.textShadow = "2px 2px 2px #2b2b2b";
    }
  }, [awkwardLoading, url]);

  useEffect(() => {
    if (
      (!state.loadingImage && url) ||
      (loadingTimeout === false && state.loadingImage === false)
    )
      setAwkwardLoading(false);
  }, [state.loadingImage, url]);

  const loaderText = useLoaderText(awkwardLoading);
  const [loadingTimeout] = useContext(Context).loadingTimeout;

  return (
    <>
      {awkwardLoading && (
        <>
          <img
            id="background"
            style={{
              zIndex: "-1",
              userSelect: "none",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(2)",
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
          zIndex: "-1",
          position: "absolute",
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        src={url}
        alt=""
        onLoad={() => {
          handleLoadingImage(false);
        }}
        onError={() => {
          handleLoadingImage(false);
          console.log("Couldn't load image.");
          // e.target.onerror = null;
          // e.target.src = lake;
        }}
      />
    </>
  );
}

export default BackgroundImage;
