import React from 'react';
import WorkoutGrid from '../components/WorkoutGrid'

class Workouts extends React.Component {
   state = {
      currentUser: {
         id: 1,
         username: "RileyMIverson",
         password: "benchpress4ever",
         firstname: "Riley",
         height: 75,
         weight: 200,
         workouts: [
         {
         id: 1,
         name: "Burn baby",
         muscleGroup: "upper body",
         sets: 3,
         exercisesPerSet: 7
         },
         {
         id: 2,
         name: "Bunz of steel",
         muscleGroup: "lower body",
         sets: 3,
         exercisesPerSet: 7
         }
         ]
      },
      userWorkouts: [],
      allWorkouts: [],
      filter: "all"
   }

   setAllWorkouts = () => {
      fetch('http://localhost:3000/workouts')
      .then(resp => resp.json())
      .then(data => {
         this.setState({
            allWorkouts: data
         })
      })     
   }

   componentDidMount() {
      this.setAllWorkouts()

      this.setState({
         userWorkouts: this.state.currentUser.workouts
      })
   }

   handleFilter = (e) => {
    let currentWorkouts = this.state.allWorkouts
    switch(e.target.value){
      case 'upper-body':
        let filteredUpper = currentWorkouts.filter(workout => workout.muscleGroup === "upper body")
        this.setState({allWorkouts: filteredUpper})
        break
      case 'lower-body':
        let filteredLower = currentWorkouts.filter(workout => workout.muscleGroup === "lower body")
        this.setState({allWorkouts: filteredLower})
        break
      case 'full-body':
        let filteredFull = currentWorkouts.filter(workout => workout.muscleGroup === "full body")
        this.setState({allWorkouts: filteredFull})
        break
      default:
        this.setState({allWorkouts: currentWorkouts})
        break
        
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
            <WorkoutGrid workouts={this.state.userWorkouts} />
            <hr/>
            <WorkoutGrid workouts={this.state.allWorkouts} />
         </div>
      )
   }
}

export default Workouts