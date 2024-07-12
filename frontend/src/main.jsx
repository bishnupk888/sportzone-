import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/features/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const GoogleAuthClientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  

      <BrowserRouter>
      <GoogleOAuthProvider clientId={GoogleAuthClientId}>
        <ToastContainer autoClose={3000} theme="dark" closeOnClick  className="mt-20"/>
        <App />
      </GoogleOAuthProvider>;
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
