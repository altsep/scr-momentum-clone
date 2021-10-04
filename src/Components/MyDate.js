import React, { useState, useEffect, useContext } from "react";
import { ItemContext } from "./Item";
import ControlsSwitch from "./ControlsSwitch";
import { useRect } from "../Hooks/useRect";
import { IconSwitch } from "../Misc/Icons";

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

  const { x, y, canDrop } = useContext(ItemContext);
  const dateSize = 2.5;

  // Handle controls
  const [text, setText] = useState("date");
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const rect = useRect("date", [hover, text]);
  const minorRect = useRect("controls", [rect]);

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
      onClick={() => setText((state) => (state === "date" ? "time" : "date"))}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {x === "center" ? (
        <>
          <p>{text === "date" ? currentTime : currentDate}</p>
          <p style={{ fontSize: "0.3em" }}>
            {text === "date" ? currentDate : currentTime}
          </p>
        </>
      ) : text === "date" ? (
        <p>{currentTime}</p>
      ) : (
        <p>{currentDate}</p>
      )}
      <ControlsSwitch
        values={{
          x,
          y,
          rect,
          active,
          setActive,
          hover,
          setHover,
          minorRect,
          text,
          icon: <IconSwitch active={active} />,
        }}
      />
    </div>
  );
}

export default MyDate;
