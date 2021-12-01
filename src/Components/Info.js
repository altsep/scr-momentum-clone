import React, { useState, useContext, useEffect } from 'react';
import { Context } from './Context';
import styled from 'styled-components';
import { ItemContext } from './Item';

function Info() {
  const { theme, themes, infoStatus, setInfoStatus, windowDimensions } =
    useContext(Context);

  const { x, y, flexStyleX, canDrop, isDragging } = useContext(ItemContext);

  useEffect(
    () => x === 'center' && setInfoStatus('initial'),
    [setInfoStatus, x]
  );

  const [smallHovered, setSmallHovered] = useState(false);

  const [awkwardLoading] = useContext(Context).awkwardLoading;

  return (
    <div
      className='info-container'
      style={Object.assign(
        {
          zIndex: '1',
          display: awkwardLoading && 'none',
          placeSelf: canDrop && 'center',
        },
        infoStatus === 'expanded' && {
          placeSelf: 'center',
          gridColumn: '1 / 3',
          gridRow: '2 / 3',
          display: 'grid',
          justifyContent: 'center',
        }
      )}
    >
      {x !== 'center' && (
        <InfoSmall
          x={x}
          y={y}
          flexStyleX={flexStyleX}
          theme={theme}
          themes={themes}
          hovered={smallHovered}
          setHovered={setSmallHovered}
          infoStatus={infoStatus}
          setInfoStatus={setInfoStatus}
        />
      )}
      {(infoStatus === 'expanded' || x === 'center') && (
        <InfoExtended
          x={x}
          theme={theme}
          themes={themes}
          hovered={smallHovered}
          isDragging={isDragging}
          canDrop={canDrop}
          windowDimensions={windowDimensions}
          infoStatus={infoStatus}
          awkwardLoading={awkwardLoading}
        />
      )}
    </div>
  );
}

const InfoSmall = ({
  x,
  y,
  flexStyleX,
  theme,
  hovered,
  setHovered,
  infoStatus,
  setInfoStatus,
}) => {
  const bgColor =
    theme.name === 'awkward' ? theme.color + '10' : theme.color + '20';
  const bgColorHovered =
    theme.name === 'awkward' ? theme.color + '15' : theme.color + '60';
  return (
    <div
      className='info-title-full'
      style={Object.assign({
        display: 'grid',
        justifyItems: flexStyleX,
        rowGap: 20,
        fontSize: '1.5rem',
        color: theme.color || '#eae7e1',
      })}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <p
          className='info-link'
          style={{
            color: hovered ? theme.color + 'ff' : theme.color,
            fontSize: '0.8em',
            fontStyle: 'italic',
            backgroundColor: hovered ? bgColorHovered : bgColor,
            padding: 15,
            marginRight: x === 'right' && 55,
            marginLeft: x === 'left' && 55,
            order: y === 'top' && 1,
          }}
        >
          {infoStatus === 'initial' ? 'Display info...' : 'Return'}
        </p>
      )}
      <p
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 35,
          height: 35,
          backgroundColor: hovered ? bgColorHovered : bgColor,
          textDecoration: hovered && 'underline',
          cursor: 'pointer',
        }}
        onClick={() => {
          setInfoStatus((state) =>
            state === 'initial' ? 'expanded' : 'initial'
          );
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
      >
        I
      </p>
    </div>
  );
};

const InfoExtended = ({
  x,
  theme,
  themes,
  isDragging,
  canDrop,
  windowDimensions,
  infoStatus,
  awkwardLoading,
}) => {
  const bgColor =
    theme.name === 'awkward' ? theme.color + '20' : themes.awkward.color + '9f';

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.controls-list');
    if (!awkwardLoading && el) {
      setTimeout(() => setScroll(el.scrollHeight > el.clientHeight), 1);
      window.addEventListener('resize', () => {
        setScroll(el.scrollHeight > el.clientHeight);
      });
    }
    return () =>
      window.removeEventListener('resize', () =>
        setScroll(el.scrollHeight > el.clientHeight)
      );
  }, [awkwardLoading]);

  return (
    <div
      className='info-extended'
      style={Object.assign(
        {
          display: isDragging ? 'none' : 'grid',
          rowGap: 20,
          fontSize: '0.9em',
          minWidth: '20rem',
          maxWidth: '40rem',
          gridColumn: '',
          color: theme.color || '#eae7e1',
          backgroundColor: canDrop ? '#00000000' : bgColor,
          padding: canDrop ? 0 : windowDimensions.height < 920 ? 5 : 50,
          borderRadius: canDrop ? 0 : 20,
          overflowY: scroll ? 'scroll' : 'hidden',
        },
        x !== 'center' && {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }
      )}
    >
      <h4 className='title'>Features:</h4>
      <ControlsListContainer
        className='controls-list details'
        x={x}
        theme={theme}
        windowHeight={windowDimensions.height}
        scroll={scroll}
        infoStatus={infoStatus}
      >
        <ControlsList />
      </ControlsListContainer>
    </div>
  );
};

const ControlsListContainer = styled.ul`
  display: grid;
  row-gap: 10px;
  line-height: 1.8;
  max-height: ${({ infoStatus, windowHeight }) =>
    infoStatus === 'expanded' ? '50vh' : windowHeight < 920 ? '34vh' : '40vh'};

  & > li {
    border-bottom: ${({ theme }) => theme.border};
  }
`;
// overflow-y: ${({ scroll }) => (scroll ? 'scroll' : 'hidden')};

const ControlsList = () => (
  <>
    <li>
      drag to and place items in one of the designated areas, swapping their
      position
    </li>
    <li>
      change background image by either double clicking on parts of screen that
      are empty or by double pressing the 'b' key
    </li>
    <li>
      switch time and date display mode or weather units by left clicking on
      either controls that appear on hovering an element or the element itself
    </li>
    <li>
      input your desired crypto currency name, weather location or theme of the
      background image by either clicking on the title or using the 'shift + c',
      'shift + w', or 'shift + l' shortcuts respectively
    </li>
    <li>use 'shift + h' to hide all elements</li>
  </>
);

export default Info;
