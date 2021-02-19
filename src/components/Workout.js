import React from 'react'

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
    currentExercise: {demo: ""},
    btnHidden: ""
  }

  restSweat = (exc, time, callback = () => {}) => {
    this.setState({
      currentTimer: time,
      currentExercise: exc
    })

    let int = setInterval(() => {
      if (this.state.currentTimer <= 0){
        clearInterval(int)
        callback()
      }
      this.setState(prevState => {
        return {
          currentTimer: --prevState.currentTimer
        }
      })

    }, 1000)
  }

  startSet = (exercises, callback = () => {}) => {
    let time = this.state.times.excTime
    let exc = this.state.nums.exc
    let arr = exercises

    switch(exc) {
      case 7:     
      this.restSweat(arr[0], time, 
        () => this.restSweat(arr[1], time, 
          () => this.restSweat(arr[2], time,
            () => this.restSweat(arr[3], time, 
              () => this.restSweat(arr[4], time, 
                () => this.restSweat(arr[5], time, 
                  () => {
                    this.restSweat(arr[6], time)
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
        this.restSweat(arr[0], time, 
          () => this.restSweat(arr[1], time, 
            () => this.restSweat(arr[2], time,
              () => this.restSweat(arr[3], time, 
                () => this.restSweat(arr[4], time, 
                  () => {
                    this.restSweat(arr[5], time)
                    callback()
                  }
                )
              )
            )
          )
        )
      

      break
      case 5:
        this.restSweat(arr[0], time, 
          () => this.restSweat(arr[1], time, 
            () => this.restSweat(arr[2], time,
              () => this.restSweat(arr[3], time, 
                () => {
                  this.restSweat(arr[4], time) 
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
    this.setState({
      btnHidden: "none"
    })

    let restTime = this.state.times.restTime
    let exercises = this.state.exercises 

    let rest = {
      name: "Rest",
      demo: "rest.mp4"
    }

    switch(this.state.nums.sets) {
      case 3:
        this.startSet(exercises,
          () => this.restSweat(rest, restTime,
            () => this.startSet(exercises,
              () => this.restSweat(rest, restTime,
                () => this.startSet(exercises)   
              )
            )  
          ) 
        )


        break
      case 2:
        this.startSet(exercises,
          () => this.restSweat(rest, restTime,
            () => this.startSet(exercises)
          ) 
        )

        break
      case 1:
        this.startSet(exercises) 

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
      }
    })

  }

  componentDidMount() {
    this.calcTimes()

    this.setState({
      currentWorkout: this.props.currentWorkout,
      exercises: this.props.currentWorkout.exercises
    })
  }

  renderVids = () => {
    if (Object.keys(this.state.currentExercise).length > 1) {
      let vidRoute = this.state.currentExercise.demo

      return(
        <video width="500px" autoPlay="autoplay" loop="loop" src={require(`../media/${vidRoute}`).default} type="video/mp4"></video>
      )
    } else {
      return (<h3>Please choose a workout</h3>)
    }


  }

  render() {
    console.log(this.state.currentExercise.demo)
    return(
      <div>
        <h3>{this.props.currentWorkout.name}</h3>
        <div className="circle">
          <h1>{this.state.currentTimer}</h1>
        </div>
        
        <h1>{this.state.currentExercise.name}</h1>

        {this.renderVids()}

        <button className="glowButton" onClick={this.startWorkout} style={{display: this.state.btnHidden}}>Start</button>
      </div>
    )
  }
}


export default Workout; 