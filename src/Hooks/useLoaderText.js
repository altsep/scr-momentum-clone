import { useState, useEffect, useRef } from 'react';

export const useLoaderText = (bool, size, str) => {
  const [text, setText] = useState((str || 'Loading') + '.');
  const ref = useRef(text);
  useEffect(() => {
    let intervalId = setInterval(
      () =>
        setText(text =>
          bool && text.length < ref.current.length + 2
            ? text + '.'
            : ref.current
        ),
      250
    );
    return () => clearInterval(intervalId);
  }, [bool, text]);
  return (
    <div
      className='details'
      style={{
        placeSelf: 'center',
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontSize: size || '1rem',
          textAlign: 'start',
          width: '6em',
        }}
      >
        {text}
      </p>
    </div>
  );
};
