import React, { useContext, useState } from "react";
import { useFetch } from "../Hooks/useFetch";
import { useLoaderText } from "../Hooks/useLoaderText";
import { Context } from "./Context";
import { ItemContext } from "./Item";
import { errorMessage } from "../Misc/minorElements";

function Crypto() {
  const url = (name) =>
    `https://api.coingecko.com/api/v3/coins/${name}?localization=false&market_data=true`;
  const [name, setName] = useState("bitcoin");
  const { refreshData } = useContext(Context);
  const { state, handleLoadingImage } = useFetch(url(name), refreshData);
  const { x, canDrop } = useContext(ItemContext);

  const loaderText = useLoaderText(state.loading);

  return (
    <div
      id="crypto"
      style={{ placeSelf: (canDrop || x === "center") && "center", margin: 10 }}
    >
      {state.error
        ? (() => {
            console.log(`Crypto — ${state.error}`);
            return errorMessage;
          })()
        : state.loading
        ? loaderText
        : state.data &&
          !state.loading && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                id="crypto-name"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <div hidden={state.loadingImage}> */}
                <img
                  src={state.data.image.thumb}
                  alt=""
                  onLoad={() => handleLoadingImage(false)}
                  onError={() => handleLoadingImage(false)}
                />
                {/* </div> */}
                &nbsp;
                <p>{state.data.name}</p>
              </div>
              <div
                id="crypto-details"
                style={{ marginTop: 10, lineHeight: 1.4, fontSize: "0.7em" }}
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
    </div>
  );
}

export default Crypto;
