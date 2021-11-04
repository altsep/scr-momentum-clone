import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    loadingImage: true,
    error: false,
    errorDetails: '',
    active: false,
  });

  const handleBool = (key, bool, reload) => {
    setState((state) => {
      let result = { ...state };
      if (reload) result[key] = !result[key];
      else result[key] = bool;
      return result;
    });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      data: state.data,
      loading: true,
      loadingImage: true,
      error: false,
    }));
    fetch(url, {})
      .then((x) => {
        // console.log(x);
        if (x.ok) {
          return x.text();
        } else throw Error(x.status);
      })
      .then((y) => {
        // console.log(y);
        y = y.match(/{.*}/);
        return JSON.parse(y);
      })
      .then((z) => {
        // console.log(z);
        if (z !== null && z.hasOwnProperty('errors')) {
          // console.log(state.data.errors)
          throw Error(z.errors);
        } else if (z !== null && z.message) {
          throw Error(z.message);
        } else if (
          state.data &&
          state.data.hasOwnProperty('urls') &&
          z.urls.regular === state.data.urls.regular
        ) {
          console.log('Duplicate url found, repeating request.');
          handleBool('active', null, true);
        } else
          setState((state) => ({
            ...state,
            data: z,
            loading: false,
          }));
      })
      .catch((err) => {
        // console.log(err);
        setState((state) => ({
          ...state,
          loading: false,
          loadingImage: false,
          error: true,
          errorDetails: err.message,
        }));
      });
  }, [url, state.active]);

  return { state, setState, handleBool };
};
