import React, { useState } from "react";
import { useRefresh } from "../Hooks/useRefresh";
import { useFetch } from "../Hooks/useFetch";
import { backgroundImageUrl } from "../Misc/apiUrls";

const Provider = (props) => {
  const [refreshData, handleRefreshData] = useRefresh(false);
  const [refreshBackgroundImage, handleRefreshBackgroundImage] =
    useRefresh(false);

  const backgroundImageData = useFetch(
    backgroundImageUrl,
    refreshBackgroundImage
  );

  const dateDisplay = useState("date");
  const hoverDate = useState("");
  const weatherUnits = useState("imperial");
  const hoverWeather = useState("");
  const awkwardLoading = useState(true);
  const loadingTimeout = useState(true);
  React.useEffect(() => {
    const timeoutId = setTimeout(() => loadingTimeout[1](false), 2000);
    // return () => clearTimeout(timeoutId);
  }, [loadingTimeout]);

  return (
    <Context.Provider
      value={{
        refreshData,
        handleRefreshData,
        handleRefreshBackgroundImage,
        backgroundImageData,
        dateDisplay,
        hoverDate,
        hoverWeather,
        weatherUnits,
        awkwardLoading,
        loadingTimeout,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const Context = React.createContext(null);

export { Context, Provider };
