import React, { useContext, useState } from "react";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";
import { errorMessage } from "../Misc/minorElements";
import { logError } from "../Misc/minorElements";
import { TwitterSVG, RedditSVG } from "../Misc/SVGs";

function Crypto() {
  const {
    cryptoState: state,
    handleCryptoBool: handleBool,
    theme,
  } = useContext(Context);

  const { x, id, canDrop, flexStyle, textAlignStyle } = useContext(ItemContext);

  const loaderText = useLoaderText(state.loading, x === "center" && "1.4em");

  const [hovered, setHovered] = useState({
    logo: false,
    twitter: false,
    reddit: false,
  });

  const handleHovered = (key, bool) => {
    setHovered((state) => {
      let result = { ...state };
      result[key] = bool;
      return result;
    });
  };

  return (
    <div
      className="crypto-container"
      style={{
        placeSelf: (canDrop || x === "center") && "center",
        margin: 10,
        display: "grid",
      }}
    >
      {state.loading
        ? loaderText
        : state.error
        ? (() => {
            // logError(id, state.error);
            return errorMessage;
          })()
        : state.data &&
          !state.loading && (
            <>
              {x === "center" ? (
                <div
                  className="crypto-center"
                  style={{
                    placeSelf: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 50px",
                    gridTemplateRows: "2fr 1fr",
                    width: "450px",
                    gap: "0 20px",
                  }}
                >
                  <div
                    style={{
                      gridColumn: "2 / 3",
                      gridRow: "1 / 2",
                      display: "grid",
                    }}
                  >
                    <a
                      href={state.data.links.homepage[0]}
                      target="_blank"
                      rel="noreferrer"
                      style={{ alignSelf: "start" }}
                      onMouseEnter={() => handleHovered("logo", true)}
                      onMouseLeave={() => handleHovered("logo", false)}
                    >
                      <img
                        src={state.data.image.small}
                        alt=""
                        onLoad={() => handleBool("loadingImage", false)}
                        onError={() => handleBool("loadingImage", false)}
                        style={{
                          width: 40,
                          height: 40,
                          transform: hovered.logo && "rotate(-30deg)",
                        }}
                      />
                    </a>
                  </div>
                  <div
                    style={{
                      alignSelf: "start",
                      gridColumn: "2 / 3",
                      gridRow: "2 / 3",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <a
                      href={`https://twitter.com/${state.data.links.twitter_screen_name}`}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => handleHovered("twitter", true)}
                      onMouseLeave={() => handleHovered("twitter", false)}
                    >
                      <TwitterSVG hovered={hovered.twitter} theme={theme} />
                    </a>
                    <a
                      href={state.data.links.subreddit_url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => handleHovered("reddit", true)}
                      onMouseLeave={() => handleHovered("reddit", false)}
                    >
                      <RedditSVG hovered={hovered.reddit} theme={theme} />
                    </a>
                  </div>
                  <div
                    className="crypto-center-details"
                    style={{
                      placeSelf: "start",
                      gridColumn: "1 / 2",
                      gridRow: "1 / 2",
                      width: "250px",
                    }}
                  >
                    <ul
                      style={{
                        alignSelf: "center",
                        textDecoration: "none",
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <li className="crypto-center-details-instance">
                        <p className="crypto-center-details-instance-text">
                          Current:
                        </p>
                        <p className="crypto-center-details-instance-value">
                          {state.data.market_data.current_price.usd.toLocaleString(
                            "en-US",
                            { style: "currency", currency: "USD" }
                          )}
                        </p>
                      </li>
                      <li className="crypto-center-details-instance">
                        <p className="crypto-center-details-instance-text">
                          High:
                        </p>
                        <p className="crypto-center-details-instance-value">
                          {state.data.market_data.high_24h.usd.toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </p>
                      </li>
                      <li className="crypto-center-details-instance">
                        <p className="crypto-center-details-instance-text">
                          Low:
                        </p>
                        <p className="crypto-center-details-instance-value">
                          {state.data.market_data.low_24h.usd.toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div
                    style={{
                      placeSelf: "start",
                      fontSize: "0.6em",
                      gridColumn: "1 / 2",
                      gridRow: "2 / 3",
                    }}
                  >
                    {state.data.public_notice !== null
                      ? state.data.public_notice
                      : state.data.description.en !== null &&
                        state.data.description.en.match(/[\w\s;-]*\./)[0]}
                  </div>
                </div>
              ) : (
                <div
                  className="crypto-normal"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <a
                    id="crypto-name"
                    href={state.data.links.homepage[0]}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: theme.color,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: flexStyle,
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={state.data.image.thumb}
                        alt=""
                        onLoad={() => handleBool("loadingImage", false)}
                        onError={() => handleBool("loadingImage", false)}
                      />
                      &nbsp;
                      <p>{state.data.name}</p>
                    </div>
                  </a>
                  <div
                    className="crypto-normal-details"
                    style={{
                      marginTop: 10,
                      lineHeight: 1.4,
                      fontSize: "0.7em",
                      textAlign: flexStyle,
                    }}
                  >
                    <div className="crypto-normal-details-instance">
                      <p>Current</p>
                      <p>
                        {state.data.market_data.current_price.usd.toLocaleString(
                          "en-US",
                          { style: "currency", currency: "USD" }
                        )}
                      </p>
                    </div>
                    <div className="crypto-normal-details-instance">
                      <p>High</p>
                      <p>
                        {state.data.market_data.high_24h.usd.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}
                      </p>
                    </div>
                    <div className="crypto-normal-details-instance">
                      <p>Low</p>
                      <p>
                        {state.data.market_data.low_24h.usd.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
    </div>
  );
}

export default Crypto;
