import React from 'react';

// const Workout = () => {
//   return (
//     <div className='workout'>
//       <h2>This is the sweat page</h2>
//       <p>if no workout selected, display: no workout selected</p>
//     </div>
//   )
// }

class Workout extends React.Component {
  state = {
    times: {
      total: 1800,
      set: 0,
      rest: 0
    }
  }



  renderTimer = () => {


  }

  calcTimes = () => {
    // 3
    let numSets = this.props.currentWorkout.sets
    // 7
    let numExc = this.props.currentWorkout.exercisesPerSet
    // number of rests in between sets
    let numRest = numSets - 1

    // time in seconds. 30min = 1800
    let restTime = 60
    let totalTime = 1800 - (restTime * numRest)
    let setTime = totalTime / numSets

    console.log(Math.floor(totalTime / 60))
    console.log(Math.floor(setTime / 60))
    console.log(Math.floor(restTime / 60))

  }

  componentDidMount() {
    this.calcTimes()
  }

  render() {
    return(
      <div>
        <h1>{this.props.currentWorkout.name}</h1>
      </div>
    )
  }
}


export default Workout; 