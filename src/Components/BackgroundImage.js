import React, { useState, useEffect } from "react";
import lake from "../lake.jpg";

function BackgroundImage({ state, handleLoadingImage }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setBackground();
  }, [state.data, state.error]);

  // Determine which image url to use
  const setBackground = () => {
    if (
      !state.loading &&
      !Object.keys(state).includes("errors") &&
      !state.error &&
      state.data &&
      state.data.urls.regular.length > 0
    ) {
      setUrl(`${state.data.urls.regular}`);
    } else if (
      !state.loading &&
      (Object.keys(state).includes("errors") || state.error)
    ) {
      handleLoadingImage(true);
      setUrl(lake);
    }
  };

  return (
    <img
      className="cover"
      src={url}
      alt=""
      onLoad={() => handleLoadingImage(false)}
      onError={() => handleLoadingImage(false)}
      style={{
        position: "absolute",
        zIndex: "-1",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        userSelect: "none",
      }}
    />
  );
}

export default BackgroundImage;
