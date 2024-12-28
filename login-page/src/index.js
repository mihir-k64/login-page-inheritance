import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-1gc7saqkj363r3ix.us.auth0.com"
    clientId="bJH2HtlExxm3osS2WiB7mgndPxsh7gf8"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/auth`,
      prompt: 'select_account',
      screen_hint: 'signup',
      response_type: 'code',
      scope: 'openid profile email'
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
    skipRedirectCallback={false}
  >
    <App />
  </Auth0Provider>
);

// Service worker and performance code
serviceWorkerRegistration.unregister();
reportWebVitals();