import React, { useState, useEffect, useContext } from 'react';
import { Context } from './Context';
import { ItemContext } from './Item';
import ControlsSwitch from '../Misc/ControlsSwitch';
import { IconSwitch } from '../Misc/Icons';

function MyDate() {
  const [data, setData] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    let dateIntervalId = setInterval(() => {
      setData(new Date());
    }, 1000);
    return () => {
      clearInterval(dateIntervalId);
    };
  }, []);

  // See the Intl.DateTimeFormat() constructor for details on the Date.prototype.toLocaleTimeString() method parameters
  useEffect(() => {
    if (data) {
      setCurrentDate(data.toLocaleDateString('en-US'));
      setCurrentTime(
        data.toLocaleTimeString('en-US', { hour12: true, timeStyle: 'short' })
      );
    }
  }, [data]);

  const { windowDimensions } = useContext(Context);
  const { id, x, y, flexStyleX, isDragging, canDrop, windowSmall } =
    useContext(ItemContext);

  // Handle controls
  const [text, setText] = useState('date');
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () =>
    setText((state) => (state === 'date' ? 'time' : 'date'));

  useEffect(() => {
    const onKeyDown = (e) => {
      ((e.shiftKey && e.key.toLowerCase() === 't') ||
        (e.shiftKey && e.key.toLowerCase() === 'd')) &&
        handleClick();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('dateSwitchTo');
    item && setText(item);
  }, []);

  useEffect(() => localStorage.setItem('dateSwitchTo', text), [text]);

  return (
    <div
      id='date-container'
      style={{
        placeSelf: (canDrop || x === 'center') && 'center',
        fontSize: x === 'center' ? '5em' : '2.5em',
        userSelect: 'none',
        display: 'flex',
        flexDirection: x === 'center' ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        transform: windowSmall && 'scale(1.2)',
        width: windowDimensions.height < 720 && '3em',
        margin: windowSmall && 0,
      }}
      onClick={handleClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {x === 'center' ? (
        <DateFull
          text={text}
          currentDate={currentDate}
          currentTime={currentTime}
          flexStyleX={flexStyleX}
        />
      ) : (
        <DateSmall
          text={text}
          currentDate={currentDate}
          currentTime={currentTime}
          flexStyleX={flexStyleX}
        />
      )}
      {!isDragging && !canDrop && !windowSmall && (
        <ControlsSwitch
          props={{
            id,
            x,
            y,
            active,
            setActive,
            hover,
            setHover,
            text,
            icon: <IconSwitch active={active} />,
          }}
        />
      )}
    </div>
  );
}

const DateFull = ({ text, currentDate, currentTime, flexStyleX }) => (
  <div
    className='date-full'
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: flexStyleX,
    }}
  >
    <p>{text === 'date' ? currentTime : currentDate}</p>
    <p style={{ fontSize: '0.3em' }}>
      {text === 'date' ? currentDate : currentTime}
    </p>
  </div>
);

const DateSmall = ({ text, currentDate, currentTime, flexStyleX }) => (
  <div
    className='date-small'
    style={{
      // whiteSpace: 'nowrap',
      textAlign: flexStyleX,
    }}
  >
    {text === 'date' ? <p>{currentTime}</p> : <p>{currentDate}</p>}
  </div>
);

export default MyDate;
