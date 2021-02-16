import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Home from '../components/Home';
import './index.css';

//import reportWebVitals from './reportWebVitals';        

ReactDOM.render((
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/browse" component={Workouts}/>
      <Route exact path="/workouts/new" component={CreateWorkout}/>
      <Route exact path="/workout" component={Workout}/>
    </div>
  </Router>),
  <App />
  document.getElementById('root')
);

//reportWebVitals();
