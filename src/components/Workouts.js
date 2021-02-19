import React from 'react';
import WorkoutGrid from '../components/WorkoutGrid'

class Workouts extends React.Component {
   state = {
      userWorkouts: [],
      allWorkouts: [],
      filteredWorkouts: [],
      userFilteredWorkouts: []
   }

   componentDidMount() {
    this.setAllWorkouts()
    this.setUserWorkouts()      
 }

   setAllWorkouts = () => {
      fetch('http://localhost:3000/workouts')
      .then(resp => resp.json())
      .then(data => {
         this.setState({
            allWorkouts: data,
            filteredWorkouts: data
         })
      })     
   }

   setUserWorkouts = () => {
      if (Object.keys(this.props.currentUser).length > 0) {
        this.setState({
          userWorkouts: this.props.currentUser.workouts,
          userFilteredWorkouts: this.props.currentUser.workouts
        })
      }
    }

    //delete 
   removeFromUserWorkouts = (workout) => {
      let newUserWorkouts = this.state.userWorkouts.filter(w => w.id !== workout.id)
      let newUserFiltered = this.state.userFilteredWorkouts.filter(w => w.id !== workout.id)
      this.props.updateUserInApp(workout)

      this.setState({
        userWorkouts: newUserWorkouts,
        userFilteredWorkouts: newUserFiltered
      })
   }


   deleteWorkout = (workout) => {
     fetch(`http://localhost:3000/workouts/${workout.id}`, {
       method: 'DELETE'
     })
     .then(res => res.json())
     .then(data => {
       this.setAllWorkouts()
       this.removeFromUserWorkouts(data)
     })
   }

    //filter 
   handleFilter = (e) => {
      const currentWorkouts = this.state.allWorkouts
      const currentUserWorkouts = this.state.userWorkouts

      switch(e.target.value){
         case 'upper-body':
            let filteredUpper = currentWorkouts.filter(workout => workout.muscleGroup === "upper body")
            let filteredUserUpper = currentUserWorkouts.filter(workout => workout.muscleGroup === "upper body")

            this.setState({
               filteredWorkouts: filteredUpper,
               userFilteredWorkouts: filteredUserUpper
            })
            break
         case 'lower-body':
            let filteredLower = currentWorkouts.filter(workout => workout.muscleGroup === "lower body")
            let filteredUserLower = currentUserWorkouts.filter(workout => workout.muscleGroup === "lower body")

            this.setState({
               filteredWorkouts: filteredLower,
               userFilteredWorkouts: filteredUserLower
            })
            break
         case 'full-body':
            let filteredFull = currentWorkouts.filter(workout => workout.muscleGroup === "full body")
            let filteredUserFull = currentUserWorkouts.filter(workout => workout.muscleGroup === "full body")

            this.setState({
               filteredWorkouts: filteredFull,
               userFilteredWorkouts: filteredUserFull
            })
            break
         default:
            this.setState({
               filteredWorkouts: currentWorkouts,
               userFilteredWorkouts: currentUserWorkouts
            })
            break
         
      }
   }

   renderWorkouts = (workoutArr, trueOrFalse) => {
     console.log(workoutArr)
     if (workoutArr.length > 0) {
       return <WorkoutGrid workouts={workoutArr} setCurrentWorkout={this.props.setCurrentWorkout} isUserWorkout={trueOrFalse} deleteWorkout={this.deleteWorkout}/>
     }
   }


   render() {
      return(
         <div className="browseContainer">
            <select onChange={this.handleFilter}>
              <option value="all">All</option>
              <option value="upper-body">Upper Body</option>
              <option value="lower-body">Lower Body</option>
              <option value="full-body">Full Body</option>
            </select>
            <h3>Your Workouts</h3>
            {this.renderWorkouts(this.state.userFilteredWorkouts, true)}
            <hr/>
            <h3>All Workouts</h3>
            {this.renderWorkouts(this.state.filteredWorkouts, false)}
         </div>
      )
   }
}

export default Workouts