import React, { useState, useEffect } from 'react';
import { controls } from '../Misc/Text';
import styled from 'styled-components';

export const InfoExtended = ({
  x,
  theme,
  themes,
  isDragging,
  canDrop,
  windowDimensions,
  infoStatus,
}) => {
  const bgColor =
    theme.name === 'awkward' ? theme.color + '20' : themes.awkward.color + '9f';
  const padding = 50;
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.controls-list');
    setScroll(el.scrollHeight - padding > el.clientHeight);
    window.addEventListener('resize', () => {
      setScroll(el.scrollHeight - padding > el.clientHeight);
    });
    return () =>
      window.removeEventListener('resize', () => {
        setScroll(el.scrollHeight - padding > el.clientHeight);
      });
  }, []);

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
          padding: canDrop
            ? 0
            : windowDimensions.height < 920
            ? padding / 10
            : padding,
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
        {controls.split('. ').map((a, i) => (
          <li key={i}>{a}</li>
        ))}
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
// list-style-position: inside;
