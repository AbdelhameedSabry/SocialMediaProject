import axios from "axios";
import { useRef } from "react";
import { useUser } from "../context/UserContext";

function reloadInterceptors(
  requestInterceptorIdRef,
  responseInterceptorIdRef,
  token,
  logOut
) {
  axios.interceptors.request.eject(requestInterceptorIdRef.current);
  axios.interceptors.response.eject(responseInterceptorIdRef.current);

  requestInterceptorIdRef.current = axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      } else {
        delete config.headers["Authorization"];
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  responseInterceptorIdRef.current = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const resp = error.response;

        if (resp.status === 401) {
          logOut();
        }
      }
      return Promise.reject(error);
    }
  );
}

export default function Interceptor(props) {
  const requestInterceptorIdRef = useRef(null);
  const responseInterceptorIdRef = useRef(null);
  const token = localStorage.getItem("token");
  const { logOut } = useUser();

  if (
    !requestInterceptorIdRef.current ||
    !responseInterceptorIdRef.current ||
    token
  )
    reloadInterceptors(
      requestInterceptorIdRef,
      responseInterceptorIdRef,
      token,
      logOut
    );

  return props.children;
}
