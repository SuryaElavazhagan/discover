import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// React loader css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './styles/index.css';
import './styles/pagination.css';
import { store } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
