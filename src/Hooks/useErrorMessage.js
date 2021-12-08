import React, { useState, useEffect } from 'react';

export const useErrorMessage = (state) => {
  const [errorText, setErrorText] = useState('An error occured.');
  const [errorDisplay, setErrorDisplay] = useState(false);

  useEffect(
    () => (state.error ? setErrorDisplay(true) : setErrorDisplay(false)),
    [state.error, setErrorDisplay]
  );

  const details = state.errorDetails;
  useEffect(() => {
    switch (details) {
      case '404':
        setErrorText('Unknown request.');
        setTimeout(() => {
          setErrorDisplay(false);
        }, 1500);
        break;
      case 'city not found':
        setErrorText(details);
        setTimeout(() => {
          setErrorDisplay(false);
        }, 1500);
        break;
      case 'No photos found.':
        setErrorText(details + ' Please enter new request');
        setTimeout(() => {
          setErrorDisplay(false);
        }, 2000);
        break;
      default:
        setErrorText(details);
    }

    if (checkForUnexpectedToken()) {
      setTimeout(() => {
        setErrorDisplay(false);
      }, 1500);
    }

    return () =>
      clearTimeout(
        setTimeout(() => {
          setErrorDisplay(false);
        }, 1500)
      );
  }, [state.error, state.errorDetails]);

  const checkForUnexpectedToken = () =>
    state.errorDetails && state.errorDetails.includes('Unexpected token');

  const timeoutErrors = ['404', 'city not found', 'No photos found.'];

  useEffect(() => {
    (checkForUnexpectedToken() || timeoutErrors.some((a) => a === details)) &&
      setErrorDisplay(false);
  }, []);

  const ErrorMessage = (props) => {
    return (
      <div
        style={Object.assign(
          {
            fontStyle: 'italic',
            fontSize: props.size || '0.7rem',
            color: props.theme.color + 'e0' || '',
          },
          props.style
        )}
      >
        {'// ' +
          (props.text || errorText.replace(/\w/, (a) => a.toUpperCase()))}
      </div>
    );
  };

  return {
    ErrorMessage,
    setErrorText,
    errorDisplay,
    setErrorDisplay,
  };
};
