import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Loading from './Loading';
import Cookies from "js-cookie";
import { DOMAIN } from "./env";
import { Link } from "react-router-dom";
const rootElement = document.getElementById("root");

const MainApp = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get("value");
    const redirectto = url.searchParams.get("redirectto");
    const paramsName = url.searchParams.get("name");
    const expirationDays = 10;
    if (params) {
      Cookies.set(paramsName, params, { expires: expirationDays });
      window.location.href = redirectto;
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (<div>
      <div style={{marginTop: '35vh'}}>
        <Loading />
      </div>
    </div>)
  }

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};
ReactDOM.render(<MainApp />, rootElement);
