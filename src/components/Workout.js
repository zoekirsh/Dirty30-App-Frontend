import React from 'react';

class Workout extends React.Component {
  state = {
    times: {
      total: 1800,
      setTime: 0,
      excTime: 0,
      restTime: 60
    },
    nums: {
      sets: 0,
      exc: 0,
      rest: 0   
    },
    exercises: [],
    currentTimer: 0,
    currentExercise: {}
  }

  restSweat = (time, callback = () => {}) => {
    this.setState({
      currentTimer: time
    })

    let int = setInterval(() => {
      this.setState(prevState => {
        return {
          currentTimer: --prevState.currentTimer
        }
      })
      if (this.state.currentTimer <= 0){
        clearInterval(int)
        callback()
      }
    }, 1000)
  }

  startSet = (callback = () => {}) => {
    let time = this.state.times.excTime
    let exc = this.state.nums.exc

    switch(exc) {
      case 7:
      this.restSweat(time, 
        () => this.restSweat(time, 
          () => this.restSweat(time,
            () => this.restSweat(time, 
              () => this.restSweat(time, 
                () => this.restSweat(time, 
                  () => {
                    this.restSweat(time)
                    callback()
                  }
                )
              )
            )
          )
        )
      )
      

      break
      case 6:
        this.restSweat(time, 
          () => this.restSweat(time, 
            () => this.restSweat(time,
              () => this.restSweat(time, 
                () => this.restSweat(time, 
                  () => {
                    this.restSweat(time)
                    callback()
                  }
                )
              )
            )
          )
        )

      break
      case 5:
        this.restSweat(time, 
          () => this.restSweat(time, 
            () => this.restSweat(time,
              () => this.restSweat(time,
                () => {
                  this.restSweat(time)
                  callback()
                }
              )
            )
          )
        )

      break
    }
  }

  startWorkout = () => {
    let restTime = this.state.times.restTime

    switch(this.state.nums.sets) {
      case 3:
        this.startSet(
          () => this.restSweat(restTime,
            () => this.startSet(
              () => this.restSweat(restTime,
                () => this.startSet()   
              )
            )  
          ) 
        )


        break
      case 2:
        this.startSet(
          () => this.restSweat(restTime,
            () => this.startSet()
          ) 
        )

        break
      case 1:
        this.startSet() 

        break
    }
  }

  calcTimes = () => {
    // 3
    let numSets = this.props.currentWorkout.sets
    // 7
    let numExc = this.props.currentWorkout.exercisesPerSet
    // number of rests in between sets
    let numRest = numSets - 1

    // time in seconds. 30min = 1800
    let rest = 60
    let total = 1800 - (rest * numRest)
    let set = (total / numSets)
    let exc = Math.floor((set / numExc) * 100) / 100

    // console.log(total)
    // console.log(set)
    // console.log(rest)
    // console.log(exc)

    this.setState({
      times: {
        totalTime: total,
        setTime: set,
        excTime: exc,
        restTime: rest
      },
      nums: {
        sets: numSets,
        exc: numExc,
        rest: numRest
      },
      exercises: this.props.exercises
    })

  }

  componentDidMount() {
    this.calcTimes()

    this.setState({
      currentWorkout: this.props.currentWorkout
    })
  }

  render() {
    return(
      <div>
        <h1>{this.props.currentWorkout.name}</h1>
        <p>{this.state.currentTimer}</p>
        <button onClick={this.startWorkout}>Start</button>
      </div>
    )
  }
}


export default Workout; 