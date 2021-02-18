import React from 'react'

const WorkoutCard = (props) => {
   return (
     <div>
        <h4>{props.workoutInfo.name}</h4>
        <p>Sets: {props.workoutInfo.sets}</p>
        <p>Exercises: {props.workoutInfo.exercisesPerSet}</p>
        {props.isUserWorkout ? <button onClick={() => props.deleteWorkout(props.workoutInfo)}>x</button> : null }
     </div>
  
   )
}

export default WorkoutCard