import axios from "axios";
import { useAuth } from "context/authContext";
import { useState } from "react";
import { useEffect } from "react";

const useFetch = (api, headerConf) => {
  const { authDispatch } = useAuth();
  const [response, setResponse] = useState({});
  useEffect(() => {
    (async () => {
      let res;
      authDispatch({ type: "SET_LOADER", payload: { loading: true } });
      try {
        res = await axios.get(api, headerConf);
        if (res.status === 200) {
          setResponse(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        authDispatch({ type: "SET_LOADER", payload: { loading: false } });
      }
    })();
  }, [api]);
  return response;
};

export { useFetch };
