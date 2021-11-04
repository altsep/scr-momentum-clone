import React, { useState, useContext } from 'react';
import { Context } from './Context';
import styled from 'styled-components';
import { ItemContext } from './Item';

function Info() {
  const { theme, themes, hoveredState } = useContext(Context);

  const [smallHovered, setSmallHovered] = useState(false);

  const [awkwardLoading] = useContext(Context).awkwardLoading;

  const { x, canDrop } = useContext(ItemContext);

  return (
    <div
      className='info container details'
      style={Object.assign(
        {
          zIndex: '1',
          display: awkwardLoading && 'none',
          placeSelf: canDrop && 'center',
        },
        hoveredState[0] === 'expanded' && {
          placeSelf: 'center',
          gridColumn: '1 / 3',
          gridRow: '2 / 3',
          display: 'grid',
          justifyContent: 'center',
        }
      )}
    >
      {x === 'center' ? (
        <InfoCenter
          theme={theme}
          themes={themes}
          hovered={smallHovered}
          setHovered={setSmallHovered}
        />
      ) : hoveredState[0] === 'initial' ? (
        <InfoSmall
          theme={theme}
          themes={themes}
          hovered={smallHovered}
          setHovered={setSmallHovered}
          hoveredState={hoveredState}
        />
      ) : (
        <InfoExtended
          theme={theme}
          themes={themes}
          hovered={smallHovered}
          setHovered={setSmallHovered}
        />
      )}
    </div>
  );
}

const InfoSmall = ({ theme, hovered, setHovered, hoveredState }) => (
  <div
    className='info title full'
    style={Object.assign(
      {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        fontSize: '1.5rem',
        color: theme.color || '#eae7e1',
        backgroundColor:
          theme.name === 'awkward' ? theme.color + '10' : theme.color + '40',
      },
      hovered && {
        fontSize: '1rem',
        width: 200,
        height: 150,
        fontStyle: 'italic',
        backgroundColor:
          theme.name === 'awkward' ? theme.color + '15' : theme.color + '60',
      }
    )}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >
    {hovered ? (
      <p
        className='info link'
        style={{
          color: theme.color,
          textDecoration: 'none',
          fontSize: '1.2em',
        }}
        onMouseEnter={(e) => {
          hoveredState[1]('expanded');
        }}
        onMouseLeave={(e) => {}}
      >
        Show more
      </p>
    ) : (
      <p>I</p>
    )}
  </div>
);

const InfoExtended = ({ theme, themes, setHovered }) => (
  <div
    className='info extended'
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'grid',
      gridTemplateColumns: '1fr 80px',
      gridTemplateRows: 'repeat(auto, 1fr)',
      columnGap: 50,
      rowGap: 20,
      fontSize: '0.9em',
      width: 600,
      color: theme.color || '#eae7e1',
      backgroundColor:
        theme.name === 'awkward'
          ? theme.color + '20'
          : themes.awkward.color + '9f',
      padding: 50,
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h4 className='title' style={{ marginBottom: 20 }}>
        Features:
      </h4>
      <ControlsListContainer className='controls-list' theme={theme}>
        <ControlsList />
      </ControlsListContainer>
    </div>
    <Back setHovered={setHovered} theme={theme} />
  </div>
);

const InfoCenter = ({ theme, themes }) => (
  <div
    className='info center'
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      fontSize: '0.9em',
      height: '100%',
      width: 600,
      color: theme.color,
      backgroundColor:
        theme.name === 'awkward'
          ? theme.color + '20'
          : themes.awkward.color + '9f',
      padding: 50,
    }}
  >
    <h4 className='title'>Features:</h4>
    <ControlsListContainer className='controls-list' theme={theme}>
      <ControlsList />
    </ControlsListContainer>
  </div>
);

const ControlsListContainer = styled.ul`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  row-gap: 10px;
  line-height: 1.8;

  & > li {
    border-bottom: ${({ theme }) => theme.border};
  }
`;

const ControlsList = () => (
  <>
    <li>drag to and place items in one of the designated areas</li>
    <li>swap position of items by dragging and dropping one of them</li>
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

const Back = ({ setHovered, theme }) => {
  const { hoveredState } = useContext(Context);
  return (
    <div
      style={{
        alignSelf: 'center',
        border: theme.border,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
      }}
      onMouseEnter={() => {
        hoveredState[1]('initial');
        setHovered(false);
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        style={{ height: 40, width: 40 }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </div>
  );
};

export default Info;
