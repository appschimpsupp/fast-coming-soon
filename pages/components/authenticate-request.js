import axios from "axios";
import React from 'react';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from '@shopify/app-bridge-react';

 function AuthenticateRequest() {
  const app = useAppBridge();
  const instance = axios.create();
    // Intercept all requests on this Axios instance
  instance.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires a Shopify App Bridge instance
      .then((token) => {
        // Append your request headers with an authenticated token
       // console.log('Session Token : ' + token);
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
  });

  return instance;
}
 
export default AuthenticateRequest;


