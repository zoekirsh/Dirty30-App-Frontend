import React from 'react';
import ExerciseCard from './ExerciseCard';

class ExerciseGrid extends React.Component {
  // state = {
  //   style: "white"
  // }

  // changeStyle = () => {
  //   this.setState({
  //     style: "#fc6c6c"
  //   })
  // }

  renderGrid = (exercises) => {
    return exercises.map( exercise => {
       return (
             <div onClick={(e) => { this.props.addExToWorkout(e, exercise) }} className="gridItem exerciseCard">
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