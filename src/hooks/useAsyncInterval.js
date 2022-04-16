import { useState, useEffect, useRef } from "react";

const useAsyncInterval = (callback, delay) => {
  const [data, setData] = useState();
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const tick = async () => {
    if (typeof savedCallback.current !== "function") {
      return;
    }
    const data = await savedCallback.current();
    setData(data);
  };

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  const reset = () => tick();

  return { data, reset };
};

export default useAsyncInterval;
