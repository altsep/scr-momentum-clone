import { useEffect, useState } from "react";

export const useFetch = (url, bool) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    loadingImage: false,
    error: false,
  });

  const handleLoadingImage = (bool) =>
    setState((state) => ({ ...state, loadingImage: bool }));

  const [isDouble, setIsDouble] = useState(false);

  const handleReload = () => setIsDouble((state) => !state);

  useEffect(() => {
    setState((state) => ({
      ...state,
      data: state.data,
      loading: true,
      loadingImage: false,
    }));
    fetch(url)
      .then((x) => {
        // console.log(x);
        if (x.ok) {
          return x.text();
        } else throw Error(true);
      })
      .then((y) => {
        // console.log(y);
        y = y.match(/{.*}/);
        return JSON.parse(y);
      })
      .then((z) => {
        // console.log(z);
        if (
          state.data &&
          state.data.hasOwnProperty("urls") &&
          z.urls.regular === state.data.urls.regular
        ) {
          console.log("Duplicate url found, repeating request.");
          handleReload();
        } else
          setState((state) => ({
            ...state,
            data: z,
            loading: false,
            loadingImage: true,
          }));
      })
      .catch((err) => {
        // console.log(err);
        if (state.error === err) {
          setState((state) => ({
            ...state,
            loading: false,
            loadingImage: false,
            error: err,
          }));
        } else setState((state) => ({ ...state, loading: false, error: err }));
      });
  }, [url, bool, isDouble]);

  return { state, handleLoadingImage, setState, handleReload };
};
