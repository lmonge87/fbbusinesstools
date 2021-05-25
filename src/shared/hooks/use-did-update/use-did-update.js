import { useEffect, useRef } from 'react';
export const useDidUpdate = (callback, props) => {
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, props);
};
