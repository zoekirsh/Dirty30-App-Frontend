import React from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
//import Logout from './components/Logout';
import Home from './components/Home';
import Workouts from './components/Workouts';
import CreateWorkout from './components/CreateWorkout';
import Workout from './components/Workout';

const URL = 'http://localhost:3000'

class App extends React.Component {
  state = {
    user: {},
    error: false,
    workouts: [],
    selectedWorkout: {}
  }

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.persistUser(token)
    }
  }

  persistUser = (token) => {
    fetch(URL + '/persist', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.username) {
        const { username, id } = data
        this.setState({
          user: {
            username,
            id
          },
        })
      }
    })
  }

  handleAuthResponse = (data) => {
    console.log(data)
    let user = JSON.parse(data.user)
    if (user.username) {
      const { username, id, firstname, height, weight, workouts, token } = user

      this.setState({
        user: {
          username, 
          id,
          firstname, 
          height,
          weight,
          workouts
        },
        error: null
      })

      localStorage.setItem("token", token)
      this.props.history.push("/home")
    } else if (data.error) {
      this.setState({
        error: data.error
      })
    }
  }

  handleLogin = (e, userInfo) => {
    e.preventDefault()

    fetch(URL + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => this.handleAuthResponse(data))
    .catch(console.log)
  }

  handleSignup = (e, userInfo) => {
    e.preventDefault()

    fetch(URL + "/signup", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ user: userInfo })
    })
    .then(res => res.json())
    .then(newUser => {
      this.handleAuthResponse(newUser)
    })
    .catch(console.log)
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({ user: {} })
  }

  render() {
    const { user, error } = this.state
    return (
      <div className="App">
        <NavBar user={user} handleLogout={this.handleLogout}/>

        <Switch>
          <Route exact path="/" render={(rProps) => <Login {...rProps} title={"Login"} handleLoginOrSignup={this.handleLogin}/> } />
          <Route exact path="/signup" render={(rProps) => <LoginForm {...rProps} title={"New User"} handleLoginOrSignup={this.handleSignup}/> } />

          {!user.id && <Redirect to="/" />}
          <Route exact path="/home" render={(rProps) => <Home {...rProps} user={this.state.user}/>} />
          <Route exact path="/browse" component={Workouts}/>
          <Route exact path="/workouts/new" component={CreateWorkout}/>
          <Route exact path="/workout" component={Workout}/>
        </Switch>
        
      </div>
    )  
  }

}

export default withRouter(App);
