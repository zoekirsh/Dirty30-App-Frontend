import React from 'react';
import WorkoutGrid from '../components/WorkoutGrid'

class Browse extends React.Component {
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

   componentDidMount() {
      fetch('http://localhost:3000/workouts')
      .then(resp => resp.json())
      .then(data => {
         this.setState({
            allWorkouts: data
         })
      })

      this.setState({
         userWorkouts: this.state.currentUser.workouts
      })
   }



   render() {
      return(
         <div className="browseContainer">
            <WorkoutGrid workouts={this.state.userWorkouts} />
            <hr/>
            <WorkoutGrid workouts={this.state.allWorkouts} />
         </div>
      )
   }
}

export default Browse