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

  const { x, canDrop, flexStyle } = useContext(ItemContext);

  const loaderText = useLoaderText(state.loading);

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
      id="crypto"
      style={{
        placeSelf: (canDrop || x === "center") && "center",
        margin: 10,
        display: "grid",
      }}
    >
      {state.error
        ? (() => {
            logError("Crypto", state.error);
            return errorMessage;
          })()
        : state.loading
        ? loaderText
        : state.data &&
          !state.loading && (
            <>
              {x === "center" ? (
                <div
                  style={{
                    placeSelf: "center",
                    display: "grid",
                    gridTemplateColumns: "5fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "40%",
                    height: "50%",
                  }}
                >
                  <div
                    style={{
                      gridColumn: "2 / 3",
                      gridRow: "1 / 3",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      marginLeft: 20,
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
                    <div>
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
                  </div>
                  <div
                    className="crypto-details crypto-center"
                    style={{
                      placeSelf: "start",
                      gridColumn: "1 / 2",
                      gridRow: "1 / 2",
                    }}
                  >
                    <ul style={{ alignSelf: "center" }}>
                      <li className="crypto-center-instance">
                        <p>Current:</p>&nbsp;
                        <p>
                          {state.data.market_data.current_price.usd.toLocaleString(
                            "en-US",
                            { style: "currency", currency: "USD" }
                          )}
                        </p>
                      </li>
                      <li className="crypto-center-instance">
                        <p>High:</p>&nbsp;
                        <p>
                          {state.data.market_data.high_24h.usd.toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </p>
                      </li>
                      <li className="crypto-center-instance">
                        <p>Low:</p>&nbsp;
                        <p>
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
                      marginTop: 40,
                      fontSize: "0.6em",
                      gridColumn: "1 / 2",
                      gridRow: "2 / 3",
                    }}
                  >
                    <div>
                      {state.data.public_notice !== null
                        ? state.data.public_notice
                        : state.data.description.en !== null &&
                          state.data.description.en.match(/[\w\s;-]*\./)[0]}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                    className="crypto-details crypto-other"
                    style={{
                      marginTop: 10,
                      lineHeight: 1.4,
                      fontSize: "0.7em",
                    }}
                  >
                    <div>
                      <p>Curr.&nbsp;</p>
                      <p>
                        {state.data.market_data.current_price.usd.toLocaleString(
                          "en-US",
                          { style: "currency", currency: "USD" }
                        )}
                      </p>
                    </div>
                    <div>
                      <p>High&nbsp;</p>
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
                    <div>
                      <p>Low&nbsp;</p>
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
