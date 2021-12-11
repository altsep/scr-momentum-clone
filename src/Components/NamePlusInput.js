import React, { useState, useEffect, useRef } from 'react';

const NamePlusInput = ({ id, x, state, setQuery, theme, char }) => {
  const [titleName, setTitleName] = useState('');
  const [titleValue, setTitleValue] = useState(titleName || '');

  useEffect(
    () =>
      state &&
      state.data &&
      setTitleName(
        state.data.name ||
          state.data.location.title ||
          (id === 'location' && !state.data.location.title && '?')
      ),
    [state, id]
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
      setInputDisplay('flex');
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

  // Crypto center positioning
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
          x === 'center' &&
          state.data && {
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
        style={{
          display: titleDisplay,
          opacity: !state.data && 0.8,
          fontStyle: !state.data && 'italic',
          fontSize: !state.data && '80%',
          cursor: 'pointer',
        }}
        onClick={handleNameDisplay}
      >
        {state.data
          ? titleName
          : id === 'weather'
          ? 'Enter location'
          : id === 'crypto'
          ? 'Enter currency'
          : id === 'location' && 'Enter keyword'}
      </p>
      <div
        style={Object.assign(
          {
            display: 'flex',
          },
          id === 'crypto' &&
            x === 'center' && {
              position: 'absolute',
              top: inputPos ? inputPos - 45 : undefined,
              left: '50%',
              transform: 'translateX(-50%)',
              writingMode: 'horizontal-tb',
            }
        )}
      >
        <input
          className={'name-hidden-input ' + theme.name}
          style={{
            display: inputDisplay,
            color: theme.color,
            textShadow: theme.textShadow,
            border: 'none',
            fontSize: '1.5rem',
            height: '1.75rem',
            maxWidth: '10rem',
            background: 'transparent',
          }}          
          ref={inputRef}
          type='text'
          name='name'
          value={titleValue}
          placeholder='Input request...'
          onChange={(e) => setTitleValue(e.target.value)}
          onKeyDown={(e) => {
            e.key === 'Enter'
              ? handleSubmit(e)
              : e.key === 'Escape' && inputRef.current.blur();
          }}
          onFocus={() => {
            setTitleValue('');
          }}
          onBlur={(e) => {
            // e.target.style.display = 'none';
            // titleRef.current.style.display = 'block';
            setInputDisplay('none');
            setTitleDisplay('block');
          }}
        />
        <button
          className='name-hidden-input__button'
          type='submit'
          style={{
            display: inputDisplay,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.75rem',
            height: '1.75rem',
            marginLeft: 2,
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: 1.15,
            padding: '0 0.25rem',
            color: theme.color + 'f0',
            backgroundColor: theme.color + '50',
          }}
          onMouseDown={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default NamePlusInput;
