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
    selectedWorkout: {}
  }

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.persistUser(token)
    }
  }

  //JWT Auth stuff
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
    // console.log(data)
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

  //Login & Signup & Logout
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

  //prop Fns for Workouts 
  createNewWorkout = (workout) => {
    console.log(workout)

    fetch(URL + "/workouts", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: workout.name,
        muscleGroup: workout.muscleGroup,
        sets: workout.sets,
        exercisesPerSet: workout.exercisesPerSet,
        exercises: [...workout.selectedExercises],
        user_id: this.state.user.id
      })
    })
    .then(res => res.json())
      //set state and reroute to Workout page aka '/sweat'
    .then(data => {
      console.log(this.state.user)
     
      this.setState((prevState) => {
        let newWorkouts = [...prevState.user.workouts, data]
        return {
          selectedWorkout: data,
          user: {...prevState.user, workouts: newWorkouts}
        }
      })

      this.props.history.push("/workout")
      }
    )
  }

  removeWorkoutFromUser = (workout) => {
    let updatedWorkouts = this.state.user.workouts.filter(w => w.id !== workout.id)
    this.setState((prevState) => {
      return {
        user: {...prevState.user, workouts: updatedWorkouts}
      }
    })
  }

  setCurrentWorkout = (workout) => {
    this.setState({
      selectedWorkout: workout
    })
    this.props.history.push("/workout")
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
          <Route exact path="/browse" render={() => <Workouts currentUser={this.state.user} setCurrentWorkout={this.setCurrentWorkout} updateUserInApp={this.removeWorkoutFromUser}/>} />
          <Route exact path="/workouts/new" render={() => <CreateWorkout handleSubmit={this.createNewWorkout}/>}/>
          <Route exact path="/workout" render={() => <Workout currentWorkout={this.state.selectedWorkout}/>}/>
        </Switch>
        
      </div>
    )  
  }

}

export default withRouter(App);
