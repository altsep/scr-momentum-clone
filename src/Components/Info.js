import React, { useState, useContext, useEffect } from 'react';
import { Context } from './Context';
import { ItemContext } from './Item';
import { InfoSmall } from './InfoSmall';
import { InfoExtended } from './InfoExtended';

function Info() {
  const { theme, themes, infoStatus, setInfoStatus } = useContext(Context);

  const { x, y, flexStyleX, canDrop, isDragging, windowDimensions } =
    useContext(ItemContext);

  useEffect(
    () => x === 'center' && setInfoStatus('initial'),
    [setInfoStatus, x]
  );

  const [smallHovered, setSmallHovered] = useState(false);

  const { awkwardLoading } = useContext(Context);

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

export default Info;
