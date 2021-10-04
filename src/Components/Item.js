import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Context } from "./Context";

// const ItemTypes = {
//   ITEM: "item",
// };

function Item(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id: props.id },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        getDragItem: monitor.getItem(),
      };
    },
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "item",
    canDrop: (item) => props.id !== item.id,
    // hover: (item, monitor) => ,
    drop: (item, monitor) =>
      monitor.isOver() &&
      props.setList((state) => {
        let sourceIndex = state.findIndex((el) => el.id === item.id);
        let targetIndex = state.findIndex((el) => el.id === props.id);
        let result = state.slice();
        const swap = (index1, index2, arr) => {
          let temp = arr[index1];
          arr[index1] = arr[index2];
          arr[index2] = temp;
        };
        swap(sourceIndex, targetIndex, result);
        return result;
      }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      dropResult: monitor.getDropResult(),
      didDrop: monitor.didDrop(),
    }),
  }));

  const ref = useRef(null);
  const dragDropRef = drag(drop(ref));

  const x = props.x;
  const y = props.y;
  const id = props.id;

  //-----
  const [awkwardLoading] = useContext(Context).awkwardLoading;

  const itemStyle = Object.assign(
    {
      margin: 10,
      opacity: (isDragging || isOver) && 0.5,
      border: isDragging
        ? "none"
        : canDrop &&
          document.getElementById("main").style.color === "rgb(43, 43, 43)"
        ? "2px dashed #2b2b2b"
        : canDrop && "2px dashed #eaeaea",
      justifySelf: x === "left" ? "start" : "end",
      alignSelf: y === "top" ? "start" : "end",
      display: awkwardLoading ? "none" : "grid",
      zIndex: "1",
    },
    canDrop && {
      margin: 20,
      height: "80%",
      width: "60%",
      transform: "scale(0.9)",
    },
    isDragging && {
      transform: "scale(0.9)",
    }
  );

  const itemStyleCenter = Object.assign(
    {
      opacity: (isDragging || isOver) && 0.5,
      border: isDragging
        ? "none"
        : canDrop &&
          document.getElementById("main").style.color === "rgb(43, 43, 43)"
        ? "2px dashed #2b2b2b"
        : canDrop && "2px dashed #eaeaea",
      gridColumn: "1 / 3",
      gridRow: "2 / 3",
      placeSelf: "center",
      display: awkwardLoading ? "none" : "grid",
      zIndex: "1",
    },
    canDrop && {
      margin: 20,
      height: "100%",
      width: "60%",
      transform: (isDragging || canDrop) && "scale(0.9)",
    },
    isDragging && {
      transform: "scale(0.9)",
    }
  );

  const flexStyleX = x === "left" ? "start" : x === "center" ? "center" : "end";
  const flexStyleY = y === "top" ? "start" : x === "center" ? "center" : "end";
  const textAlignStyle = canDrop || x === "center" ? "center" : "start";

  return (
    <ItemProvider
      value={{
        x,
        y,
        id,
        isDragging,
        canDrop,
        flexStyleX,
        flexStyleY,
        textAlignStyle,
      }}
    >
      <div
        className={`item ${id} ${x}`}
        ref={dragDropRef}
        style={x === "center" ? itemStyleCenter : itemStyle}
        hidden={awkwardLoading}
      >
        {props.el}
        {canDrop && (
          <div
            style={{
              fontSize: "0.5em",
              textTransform: "uppercase",
              placeSelf: "center",
            }}
          >
            {"> drop here to swap items <"}
          </div>
        )}
      </div>
    </ItemProvider>
  );
}

export const ItemContext = React.createContext(null);
const ItemProvider = ItemContext.Provider;

export default Item;
