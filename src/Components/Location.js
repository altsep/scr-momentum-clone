import React, { useContext } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";
import { logError } from "../Misc/minorElements";

function Location() {
  const { unsplashState: state } = useContext(Context);
  const { x, canDrop } = useContext(ItemContext);
  const loaderText = useLoaderText(state.loadingImage);
  const { theme } = useContext(Context);

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
          : canDrop || x === "center"
          ? x
          : x === "right" && x,
        display: x === "center" && "grid",
        height: x === "center" && "100%",
      }}
    >
      {state.error ? (
        (() => {
          logError("Location", state.error);
          return "Couldn't load background image.";
        })()
      ) : state.loadingImage ? (
        <p
          style={{
            placeSelf: x === "center" && "center",
            textAlign: "left",
            width: "100%",
          }}
        >
          {loaderText}
        </p>
      ) : (
        state.data !== null &&
        !state.loadingImage &&
        !Object.keys(state).includes("errors") &&
        !state.error && (
          <>
            {x === "center" ? (
              <div
                style={{
                  placeSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                  height: "80%",
                }}
              >
                <p>{state.data.location.title || "?"}</p>
                <div
                  className="border-line"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: theme.border,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "0.7em",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <p>
                        {state.data.user
                          ? state.data.user.instagram_username ||
                            state.data.user.name
                          : "?"}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "start",
                          fontSize: "0.7em",
                          marginTop: 10,
                        }}
                      >
                        {!/canon|nikon/i.test(state.data.exif.make) &&
                          typeof state.data.exif.make === "string" && (
                            <p>{state.data.exif.make}&nbsp;</p>
                          )}
                        <p>{state.data.exif.model}</p>
                      </div>
                    </div>
                  </div>
                  <img
                    style={{
                      gridColumn: "2 / 3",
                      gridRow: "2 / 3",
                      opacity: 0.8,
                      marginLeft: 20,
                    }}
                    src={state.data.user.profile_image.medium}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <p>
                {typeof state.data.location.title === "string"
                  ? state.data.location.title
                  : "?"}
              </p>
            )}
          </>
        )
      )}
    </div>
  );
}

export default Location;
