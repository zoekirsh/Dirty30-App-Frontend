import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App';
import './index.css';

//import reportWebVitals from './reportWebVitals';        

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
);

//reportWebVitals();
