import { useState, useEffect } from "react";

const useFetchInterval = (callback, delay) => {
  const [data, setData] = useState();
  const [count, setCount] = useState(0);

  const tick = async () => {
    console.log("Cnt");
    if (typeof callback !== "function") {
      return;
    }
    const data = await callback();
    setData(data);
  };

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => setCount((prev) => prev + 1), delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  useEffect(() => {
    tick();
  }, [count]);

  const refetch = () => tick();

  return { data, refetch };
};

export default useFetchInterval;
