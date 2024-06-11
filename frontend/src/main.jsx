import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/features/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  

      <BrowserRouter>
        <ToastContainer autoClose={3000} theme="dark" closeOnClick  className="mt-20"/>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
