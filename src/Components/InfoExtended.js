import React, { useState, useEffect } from 'react';
import { ControlsList } from './InfoControlsList';
import styled from 'styled-components';

export const InfoExtended = ({
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
