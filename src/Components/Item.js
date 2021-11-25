import React, { useRef, useContext, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Context } from './Context';

const ItemTypes = {
  item: 'item',
};

function Item(props) {
  const { x, y, id, infoExpanded } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.item,
    item: { id: props.id },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        getDragItem: monitor.getItem(),
      };
    },
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.item,
    canDrop: (item) => props.id !== item.id,
    // hover: (item, monitor) => ,
    drop: (item, monitor) =>
      monitor.isOver() &&
      props.setList((state) => {
        let sourceIndex = state.findIndex((el) => el.id === item.id);
        let targetIndex = state.findIndex((el) => el.id === props.id);
        let result = state.slice();
        const swapItems = (index1, index2, arr) => {
          let temp = arr[index1];
          arr[index1] = arr[index2];
          arr[index2] = temp;
        };
        swapItems(sourceIndex, targetIndex, result);
        const storedResult = JSON.stringify(result.map((a) => a.id));
        localStorage.setItem('items', storedResult);
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

  //----
  const [awkwardLoading] = useContext(Context).awkwardLoading;

  const [itemsHidden, setItemsHidden] = React.useState(false);

  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions();
    window.addEventListener('resize', () => setDimensions());
    return () => window.removeEventListener('resize', () => setDimensions());
  }, []);

  useEffect(() => setDimensions(), [infoExpanded]);

  const setDimensions = () =>
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  const itemStyle = Object.assign(
    {
      zIndex: '1',
      opacity: (isDragging || isOver) && 0.5,
      border: isDragging
        ? 'none'
        : canDrop &&
          document.getElementById('main').style.color === 'rgb(43, 43, 43)'
        ? '2px dashed #2b2b2b'
        : canDrop && '2px dashed #eaeaea',
      justifySelf: x === 'left' ? 'start' : 'end',
      alignSelf: y === 'top' ? 'start' : 'end',
      display: itemsHidden ? 'none' : 'grid',
      maxWidth: window.innerWidth / 2 - 20,
      maxHeight: '95%',
      gridRow: y === 'bottom' && '3 / 4',
    },
    canDrop && {
      margin: 10,
      height: '100%',
      width: '100%',
    },
    isDragging && {
      transform: 'scale(0.9)',
    }
  );

  const itemStyleCenter = Object.assign(
    {
      opacity: (isDragging || isOver) && 0.5,
      border: isDragging
        ? 'none'
        : canDrop &&
          document.getElementById('main').style.color === 'rgb(43, 43, 43)'
        ? '2px dashed #2b2b2b'
        : canDrop && '2px dashed #eaeaea',
      gridColumn: '1 / 3',
      gridRow: '2 / 3',
      placeSelf: 'center',
      zIndex: '1',
      display:
        awkwardLoading || itemsHidden || windowDimensions.height < 720
          ? 'none'
          : 'grid',
      maxWidth: window.innerWidth - 24,
      maxHeight: '95%',
      borderRadius: 20,
      padding: 50,
      backgroundColor: infoExpanded && '#00000000',
    },
    canDrop && {
      borderRadius: 0,
      padding: 0,
      height: '100%',
      width: '100%',
    },
    isDragging && {
      transform: 'scale(0.9)',
    }
  );

  const flexStyleX = x === 'left' ? 'start' : x === 'center' ? 'center' : 'end';
  const flexStyleY = y === 'top' ? 'start' : x === 'center' ? 'center' : 'end';

  // Handle controls for "hide all"
  useEffect(() => {
    const onKeyDown = (e) =>
      e.shiftKey &&
      e.key.toLowerCase() === 'h' &&
      setItemsHidden((state) => !state);
    document.addEventListener('keydown', onKeyDown);
    return () =>
      document.removeEventListener(
        'keydown',
        onKeyDown
      );
  }, []);

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
        windowDimensions,
      }}
    >
      <div
        className={`item ${id} ${x}`}
        ref={dragDropRef}
        style={x === 'center' ? itemStyleCenter : itemStyle}
        hidden={awkwardLoading}
      >
        {infoExpanded && id !== 'info' ? <></> : props.el}
        {canDrop && (
          <div
            style={{
              fontSize: '0.5em',
              textTransform: 'uppercase',
              justifySelf: 'center',
              alignSelf: 'end',
            }}
          >
            {'> drop here to swap items <'}
          </div>
        )}
      </div>
    </ItemProvider>
  );
}

export const ItemContext = React.createContext(null);
const ItemProvider = ItemContext.Provider;

export default Item;
