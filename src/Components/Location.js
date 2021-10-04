import React, { useContext } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";

function Location() {
  const { unsplashState: state } = useContext(Context);
  const { x, canDrop, flexStyleX } = useContext(ItemContext);
  const loaderText = useLoaderText(state.loadingImage, x === "center" && "1em");
  const { theme } = useContext(Context);

  return (
    <>
      {state.error ? (
        <p style={{ fontStyle: "italic" }}>Couldn't load image.</p>
      ) : state.loadingImage ? (
        loaderText
      ) : (
        state.data !== null &&
        !state.loadingImage &&
        !Object.keys(state).includes("errors") &&
        !state.error && (
          <div
            id="location"
            className="details"
            style={Object.assign(
              {
                placeSelf: (canDrop || x === "center") && "center",
                margin: 10,
                width:
                  state.loadingImage || canDrop
                    ? "6em"
                    : x === "center" && "600px",
                textAlign: flexStyleX,
                fontSize: "0.9em",
              },
              x === "center" && {
                fontSize: "1.4em",
                display: "grid",
                height: "100%",
              }
            )}
          >
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
                  className="border-line details"
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
          </div>
        )
      )}
    </>
  );
}

export default Location;
