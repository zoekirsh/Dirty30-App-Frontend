import React from 'react';
import WorkoutGrid from '../components/WorkoutGrid'

class Workouts extends React.Component {
   state = {
      currentUser: {},
      userWorkouts: [],
      allWorkouts: [],
      filteredWorkouts: [],
      userFilteredWorkouts: []
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

   componentDidMount() {
      this.setAllWorkouts()

      if (Object.keys(this.state.currentUser).length > 0) {
         this.setState({
            userWorkouts: this.state.currentUser.workouts,
            userFilteredWorkouts: this.state.currentUser.workouts
         })
      }
   }

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

   renderWorkouts = (workoutArr) => {
      return <WorkoutGrid workouts={workoutArr} />
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
            {this.renderWorkouts(this.state.userFilteredWorkouts)}
            <hr/>
            {this.renderWorkouts(this.state.filteredWorkouts)}
         </div>
      )
   }
}

export default Workouts