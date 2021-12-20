import React, { useState, useContext, useEffect } from 'react';
import { Context } from './Context';
import { InfoSmall } from './InfoSmall';
import { InfoExtended } from './InfoExtended';

function Info(props) {
  const context = useContext(Context);
  const { infoStatus, setInfoStatus } = context;

  const { x, canDrop } = props;

  useEffect(
    () => x === 'center' && setInfoStatus('initial'),
    [setInfoStatus, x]
  );

  const [smallHovered, setSmallHovered] = useState(false);

  const { awkwardLoading } = useContext(Context);

  const childProps = {
    ...props,
    ...context,
    hovered: smallHovered,
    setHovered: setSmallHovered,
  };

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
      {x !== 'center' && <InfoSmall {...childProps} />}
      {(infoStatus === 'expanded' || x === 'center') && (
        <InfoExtended {...childProps} />
      )}
    </div>
  );
}

export default Info;
