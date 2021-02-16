import React from 'react'
import WorkoutCard from '../components/WorkoutCard' 

class WorkoutGrid extends React.Component {

   renderGrid = (workoutArr) => {
      return workoutArr.map( workout => {
         return (
            <div className="gridItem">
               <WorkoutCard workoutInfo={workout}/>
            </div>
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