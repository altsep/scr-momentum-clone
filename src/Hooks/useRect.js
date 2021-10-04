import { useState, useEffect } from "react";

export const useRect = (name, deps, type) => {
  const [rect, setRect] = useState({});

  const getEl = (type, name) => {
    switch (type) {
      case "id":
        return document.getElementById(name);
      case "class":
        return document.getElementsByClassName(name)[0];
      case "tag":
        return document.getElementsByTagName(name)[0];
      default:
        return document.getElementById(name);
    }
  };

  useEffect(() => {
    const el = getEl(type, name);
    el !== null && setRect(el.getBoundingClientRect());
  }, deps);

  return rect;
};
