import React, { useRef, useContext, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Context } from './Context';

const ItemTypes = {
  item: 'item',
};

function Item(props) {
  const { x, y, id, i, el, infoExpanded } = props;

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
  const {
    windowDimensions: { width, height },
    awkwardLoading: [awkwardLoading],
    theme,
  } = useContext(Context);

  const [itemsHidden, setItemsHidden] = React.useState(false);

  const [windowSmall, setWindowSmall] = useState(false);
  useEffect(
    () =>
      width < 700 || height < 720
        ? setWindowSmall(true)
        : setWindowSmall(false),
    [width, height]
  );

  const itemStyle = Object.assign(
    {
      zIndex: '1',
      opacity: (isDragging || isOver) && 0.5,
      border: isDragging
        ? 'none'
        : canDrop && theme.name === 'awkward'
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
        : canDrop && theme.name === 'awkward'
        ? '2px dashed #2b2b2b'
        : canDrop && '2px dashed #eaeaea',
      gridColumn: '1 / 3',
      gridRow: '2 / 3',
      placeSelf: 'center',
      zIndex: '1',
      display: awkwardLoading || itemsHidden ? 'none' : 'grid',
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

  const itemStyleMedia = Object.assign(
    {
      opacity: (isDragging || isOver) && 0.5,
      zIndex: '1',
      display: awkwardLoading || itemsHidden ? 'none' : 'grid',
      placeItems: 'center',
      backgroundColor: infoExpanded && '#00000000',
      maxWidth: window.innerWidth - 24,
    },
    canDrop && {
      borderTopWidth: '2px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderBottomWidth: '2px',
      borderTopStyle: 'dashed',
      borderLeftStyle: 'dashed',
      borderRightStyle: 'dashed',
      borderBottomStyle: 'dashed',
      borderColor: theme.name === 'awkward' ? '#2b2b2b' : '#eaeaea',
      borderRadius: 0,
      height: '100%',
      width: '100%',
    },
    isDragging && {
      transform: 'scale(0.9)',
      borderTopStyle: 'none',
      borderLeftStyle: 'none',
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
    },
    windowSmall &&
      (id === 'info' || id === 'location') && {
        display: 'none',
      },
    windowSmall && {
      backgroundColor: '#00000044',
      margin: 0,
      padding: 0,
    },
    height < 720
      ? {
          width: width / 3,
          height: '100%',
          borderLeftWidth: i === 1 || i === 2 ? '1px' : '0',
          borderLeftStyle: canDrop ? 'dashed' : 'solid',
          borderRightWidth: i === 0 || i === 1 ? '1px' : '0',
          borderRightStyle: canDrop ? 'dashed' : 'solid',
        }
      : width < 700 && {
          width: '100%',
          height: height / 3,
          borderTopWidth: i === 1 || i === 2 ? '1px' : '0',
          borderTopStyle: canDrop ? 'dashed' : 'solid',
          borderBottomWidth: i === 0 || i === 1 ? '1px' : '0',
          borderBottomStyle: canDrop ? 'dashed' : 'solid',
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
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ItemProvider
      value={{
        x: windowSmall ? 'initial' : x,
        y: windowSmall ? 'initial' : y,
        id,
        isDragging,
        canDrop,
        flexStyleX: windowSmall ? 'center' : flexStyleX,
        flexStyleY: windowSmall ? 'center' : flexStyleY,
        windowSmall,
      }}
    >
      <div
        className={`item ${id} ${x}`}
        ref={dragDropRef}
        style={
          windowSmall
            ? itemStyleMedia
            : x === 'center'
            ? itemStyleCenter
            : itemStyle
        }
        hidden={awkwardLoading}
      >
        {infoExpanded && id !== 'info' ? <></> : el}
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
