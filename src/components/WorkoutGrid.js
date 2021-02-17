import React from 'react'
import WorkoutCard from './WorkoutCard'

// import { Link } from 'react-router-dom'

class WorkoutGrid extends React.Component {

   handleClick = (id) => {
      return console.log(id)
   }

   renderGrid = (workoutArr) => {
      return workoutArr.map( workout => {
         return (
            // <Link >
               <div onClick={() => this.handleClick(workout.id)} className="gridItem">
                  <WorkoutCard key={workout.id} workoutInfo={workout}/>
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