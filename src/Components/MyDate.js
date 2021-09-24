import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { ItemContext } from "./Item";

function MyDate() {
  const [data, setData] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    let dateIntervalId = setInterval(() => {
      setData(new Date());
    }, 1000);
    return () => {
      clearInterval(dateIntervalId);
    };
  }, []);

  // See the Intl.DateTimeFormat() constructor for details on the Date.prototype.toLocaleTimeString() method parameters
  useEffect(() => {
    if (data) {
      setCurrentDate(data.toLocaleDateString("en-US"));
      setCurrentTime(
        data.toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" })
      );
    }
  }, [data]);

  const [dateDisplay, setDateDisplay] = useContext(Context).dateDisplay;
  const setHover = useContext(Context).hoverDate[1];
  const { x, canDrop } = useContext(ItemContext);
  const dateSize = 2.5;

  return (
    <div
      id="date"
      style={{
        placeSelf: (canDrop || x === "center") && "center",
        fontSize: x === "center" ? `${dateSize * 2}em` : `${dateSize}em`,
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={() =>
        setDateDisplay((state) => (state === "date" ? "time" : "date"))
      }
      onMouseOver={() => setHover("swap-date-hovered")}
      onMouseLeave={() => setHover("")}
    >
      {x === "center" ? (
        <>
          <p>{dateDisplay === "date" ? currentTime : currentDate}</p>
          <p style={{ fontSize: "0.3em" }}>
            {dateDisplay === "date" ? currentDate : currentTime}
          </p>
        </>
      ) : dateDisplay === "date" ? (
        <p>{currentTime}</p>
      ) : (
        <p>{currentDate}</p>
      )}
    </div>
  );
}

export default MyDate;
