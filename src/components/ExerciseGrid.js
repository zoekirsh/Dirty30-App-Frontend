import React from 'react';
import ExerciseCard from './ExerciseCard';

class ExerciseGrid extends React.Component {

  renderGrid = (exercises) => {
    return exercises.map( exercise => {
       return (
             <div onClick={() => this.props.addExToWorkout(exercise)} className="gridItem exerciseCard">
                <ExerciseCard key={exercise.id} exercise={exercise}/>
             </div>
       )
    })
 }

  render() {
    return (
      <div className="grid">
        {this.renderGrid(this.props.exercises)}
      </div>
    )
  }
}

export default ExerciseGrid;