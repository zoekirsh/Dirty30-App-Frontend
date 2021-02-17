import React from 'react';
import './App.css';
import {
  Route, withRouter, Switch
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import Home from './components/Home';
import Workouts from './components/Workouts';
import CreateWorkout from './components/CreateWorkout';
import Workout from './components/Workout';

class App extends React.Component {

  state = {
    user: {},
    workouts: [],
    selectedWorkout: {}
  }

  handleLogin = ({ username, password }) => {
    this.setState({
      user: {
        username: username,
        password: password
      }
    })
  }

  handleSignup = ({username, password}) => {
    fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username: username,
        password: password 
      })
    })
    .then(res => res.json())
    .then(newUser => this.setState({
      user: newUser
    }))
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path="/" render={(rProps) => <Login {...rProps} title={"Login"} userdata={this.state.user} handleSubmit={this.handleLogin}/>}/>
        <Route exact path="/signup" render={(rProps) => <LoginForm {...rProps} title={"New User"} handleSubmit={this.handleSignup}/>}/>
        <Route exact path="/home" render={() => <Home user={this.state.user}/> }/>
        <Route exact path="/browse" component={Workouts}/>
        <Route exact path="/workouts/new" component={CreateWorkout}/>
        <Route exact path="/workout" component={Workout}/>
        <Route exact path="/logout" render={(rProps) => <Logout {...rProps}/>}/>
      </div>
    )  
  }
}

export default withRouter(App);
