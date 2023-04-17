import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-dp2yuapdx14xfqw8.eu.auth0.com"
      clientId="lQdYLavFSA494d1g7a0I5qkgKgXa1rt7"
      authorizationParams={{
        redirect_uri: "http://localhost:8080",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
