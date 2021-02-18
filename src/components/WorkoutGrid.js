import React from 'react'
import WorkoutCard from './WorkoutCard'

// import { Link } from 'react-router-dom'

class WorkoutGrid extends React.Component {

   handleClick = (workout) => {
      this.props.setCurrentWorkout(workout)
   }

   renderGrid = (workoutArr) => {
      return workoutArr.map( workout => {
         return (
            // <Link >
               <div onClick={() => this.handleClick(workout)} className="gridItem">
                  <WorkoutCard key={workout.id} workoutInfo={workout} isUserWorkout={this.props.isUserWorkout} deleteWorkout={this.props.deleteWorkout}/>
               </div>
            // </Link>
         )
      })
   }

   render() {
      return(
         <div className="grid">
            { this.renderGrid(this.props.workouts) }
         </div>
      )
   }
}

export default WorkoutGrid