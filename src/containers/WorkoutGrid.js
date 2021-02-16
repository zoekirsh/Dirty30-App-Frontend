import React from 'react'
import WorkoutCard from '../components/WorkoutCard' 

class WorkoutGrid extends React.Component {

   renderGrid = (workoutArr) => {
      workoutArr.map( workout => {
         <div>
            {console.log(workout)}
            <WorkoutCard />
         </div>
      })
   }

   render() {
      return(
         <div>
            { this.renderGrid(this.props.workouts) }
         </div>
      )
   }
}

export default WorkoutGrid