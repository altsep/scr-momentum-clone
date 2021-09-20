import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

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

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
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
    })
  );

  const ref = useRef(null);
  const dragDropRef = drag(drop(ref));

  const x = props.x;
  const y = props.y;

  //----
  const itemStyle = Object.assign(
    {
      margin: (isDragging || canDrop) ? 20 : 10,
      opacity: isDragging || isOver ? 0.5 : 1,
      transform: (isDragging || canDrop) && "scale(0.9)",
      border: isDragging ? "none" : canDrop && "2px dashed #fff",
      justifySelf: x === "left" ? "flex-start" : "flex-end",
      alignSelf: y === "top" ? "flex-start" : "flex-end",
    },
    canDrop
      ? {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          height: "40%",
        }
      : null
  );

  const itemStyleCenter = Object.assign(
    {
      margin: isDragging || canDrop ? 10 : 0,
      opacity: isDragging || isOver ? 0.5 : 1,
      transform:
        isDragging || canDrop
          ? "scale(0.9) translate(-60%, -60%)"
          : "translate(-50%, -50%)",
      border: isDragging ? "none" : canDrop && "2px dashed #fff",
      position: "absolute",
      top: "50%",
      left: "50%",
    },
    canDrop
      ? {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          height: "40%",
        }
      : null
  );

  return (
    <ItemProvider value={{ x, y }}>
      <div
        ref={dragDropRef}
        style={x !== "center" ? itemStyle : itemStyleCenter}
      >
        {props.el}
        <div
          style={{
            fontSize: "0.5em",
            textTransform: "uppercase",
            position: "absolute",
            bottom: 10,
          }}
        >
          {canDrop && "> drop here to swap items <"}
        </div>
      </div>
    </ItemProvider>
  );
}

export const ItemContext = React.createContext(null);
const ItemProvider = ItemContext.Provider;

export default Item;
