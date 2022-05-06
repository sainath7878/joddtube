import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const useFetch = (api) => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    (async () => {
      let res;
      try {
        res = await axios.get(api);
        if (res.status === 200) {
          setResponse(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [api]);
  return response;
};

export { useFetch };
