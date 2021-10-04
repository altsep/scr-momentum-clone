const ControlsSwitch = ({ values }) => {
  const {
    id,
    minorRect,
    x,
    y,
    rect,
    active,
    setActive,
    hover,
    setHover,
    text,
    icon,
  } = values;

  return (
    <div
      id="controls"
      style={Object.assign(
        {
          position: "absolute",
          top: y === "top" ? rect.bottom : rect.top - 30 || undefined,
          left: rect.left + rect.width / 2 - minorRect.width / 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(0.8)",
          opacity: hover ? "1" : "0",
        },
        x === "center" && {
          top: rect.top - 50 || undefined,
          left: rect.left ? rect.left + rect.width / 2 : undefined,
          transform: "translateX(-50%)",
        }
      )}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseEnter={() => {
        setHover(true);
        setActive(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
    >
      <p
        style={{
          fontSize: "0.6rem",
          marginRight: "0.15rem",
          textTransform: "uppercase",
        }}
      >
        {text}
      </p>
      {icon}
    </div>
  );
};

export default ControlsSwitch;
