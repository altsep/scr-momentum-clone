import React, { useState, useContext } from "react";
import { ItemContext } from "./Item";
import styled from "styled-components";

function Info() {
  const { x, canDrop, isDragging, flexStyleX, flexStyleY } =
    useContext(ItemContext);

  const [text, setText] = useState("I");
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        placeSelf: (canDrop || x === "center") && "center"
      }}
      onMouseEnter={(e) => {
        e.target.style.color = "#fff";
        e.target.style.backgroundColor = "#fcfcfcd9";
      }}
      onMouseLeave={(e) => {
        e.target.style.color = "#eae7e1";
        e.target.style.backgroundColor = "#fcfcfc80";
      }}
    >
      <div
        className="title"
        style={{
          width: 40,
          height: 40,
          fontSize: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#eae7e1",
          backgroundColor: "#fcfcfc80",
        }}
      >
        {text}
      </div>
    </div>
  );
}

const InfoChild = styled.div`
  place-self: ${({ context }) =>
    (context.canDrop || context.x === "center") && "center"};
  width: 50px;
  height: 50px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eae7e1;
  background-color: #fcfcfc66;
  height: 100%;
  &:hover {
    background-color: #fcfcfcd9;
    color: #fff;
  }
`;

export default Info;
