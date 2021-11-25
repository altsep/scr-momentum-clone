import React, { useState, useEffect, useRef } from 'react';

const NamePlusInput = ({ id, x, state, setQuery, titleText, theme, char }) => {
  const [titleName, setTitleName] = useState(titleText);

  const [titleValue, setTitleValue] = useState(titleName || '');

  useEffect(
    () =>
      id === 'crypto' && setTitleName(state && state.data && state.data.name),
    [state.data]
  );

  const titleRef = useRef(null);
  const inputRef = useRef(null);

  const [titleDisplay, setTitleDisplay] = useState('block');
  const [inputDisplay, setInputDisplay] = useState('none');

  const handleNameDisplay = () => {
    if (titleRef.current !== null)
      if (id === 'crypto' && x === 'center') {
        setTitleDisplay('block');
      } else setTitleDisplay('none');
    if (inputRef.current !== null) {
      setInputDisplay('block');
      setTimeout(() => inputRef.current.focus(), 1);
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === char) {
        const el = document.getElementsByClassName('name-hidden-input');
        let displayArr = [];
        for (let i = 0; i < el.length; i++) {
          const display = el[i].style.display;
          displayArr.push(display);
        }
        if (displayArr.every((a) => a === 'none')) return handleNameDisplay();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [char, handleNameDisplay]);

  const handleSubmit = (e) => {
    setQuery(
      titleValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z\s-]/gi, '')
    );
    inputRef.current.blur();
  };

  // Some positional gimmicks for crypto center.
  const [inputPos, setInputPos] = useState(0);

  useEffect(() => {
    const mainEl =
      id === 'crypto' && document.querySelector('.crypto-description');
    const posTop = mainEl && mainEl.offsetTop;
    setInputPos(posTop);
  });

  return (
    <div
      className='name-container'
      style={Object.assign(
        {
          alignSelf: x === 'center' && 'center',
          display: 'flex',
          justifyContent: 'center',
        },
        id === 'crypto' &&
          x === 'center' && {
            display: 'block',
            alignSelf: 'center',
            writingMode: 'vertical-rl',
            textOrientation: 'sideways',
          }
      )}
    >
      <p
        className='name'
        ref={titleRef}
        style={{ display: titleDisplay }}
        onClick={handleNameDisplay}
      >
        {titleName}
      </p>
      <input
        className='name-hidden-input'
        ref={inputRef}
        style={Object.assign(
          {
            display: inputDisplay,
            color: theme.color,
            textShadow: theme.textShadow,
            border: '0px',
            borderColor: !theme.color,
            fontSize: '1.5rem',
            width: '10em',
            background: 'transparent',
          },
          id === 'crypto' &&
            x === 'center' && {
              position: 'absolute',
              top: inputPos ? inputPos - 45 : undefined,
              left: '50%',
              transform: 'translateX(-50%)',
            }
        )}
        type='text'
        name='name'
        value={titleValue}
        placeholder='Input request...'
        onChange={(e) => setTitleValue(e.target.value)}
        onFocus={() => {
          setTitleValue('');
        }}
        onBlur={(e) => {
          setTitleValue(titleName);
          // e.target.style.display = 'none';
          // titleRef.current.style.display = 'block';
          setInputDisplay('none');
          setTitleDisplay('block');
        }}
        onKeyDown={(e) => {
          e.key === 'Enter'
            ? handleSubmit(e)
            : e.key === 'Escape' && inputRef.current.blur();
        }}
      />
    </div>
  );
};

export default NamePlusInput;
