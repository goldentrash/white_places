import './style/app.css';
import './style/layout.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <App age={5} />
  </React.StrictMode>,
  document.getElementById('application')
);
