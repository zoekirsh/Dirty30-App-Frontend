import React from 'react';
import ExerciseGrid from './ExerciseGrid'

class CreateWorkout extends React.Component {

  state = {
    name: "",
    muscleGroup: "full body",
    sets: 1,
    exercisesPerSet: 5,
    allExercises: [],
    filteredExercises: [],
    selectedExercises: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/exercises')
    .then(res => res.json())
    .then(data => this.setState({
      allExercises: data,
      filteredExercises: data
    }))
  }

  addExToWorkout = (exercise) => {
    console.log(exercise)
    //add to state
    let exArr = this.state.selectedExercises
    let exPerSet = parseInt(this.state.exercisesPerSet)
    if (exArr.length < exPerSet) {
      this.setState({
        selectedExercises: [...exArr, exercise]
      })
    }
   
  }

  handleChange = (e) => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleFilter = (e) => {
    let currentExs = this.state.filteredExercises
    let allExs = this.state.allExercises

    switch(e.target.value){
      case 'upper-body':
        let uppers = allExs.filter(ex => ex.muscleGroup === "upper body")
        
        this.setState({
          filteredExercises: uppers,
          muscleGroup: "upper body"
        })
        break
      case 'lower-body':
        let lowers = allExs.filter(ex => ex.muscleGroup === "lower body")

        this.setState({
          filteredExercises: lowers,
          muscleGroup: "lower body"
        })
        break
      case 'full-body':
        let full = allExs

        this.setState({
          filteredExercises: full,
          muscleGroup: "full body"
        })
        break
      default:
        this.setState({
          filteredExercises: currentExs
        })
        break
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <div className='createWorkout'>
        <h2>Design Your Workout:</h2>
        <form className="createworkoutform" onSubmit={this.handleSubmit}>
          <label>
            Please select target muscle group:
            <select onChange={this.handleFilter}>
              <option value="upper-body">Upper Body</option>
              <option value="lower-body">Lower Body</option>
              <option selected value="full-body">Full Body</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>
            Please select desired number of sets:
            <select name="sets" onChange={this.handleChange} value={this.state.sets}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>
            Please select desired number of exercises per set:
            <select name="exercisesPerSet" onChange={this.handleChange} value={this.state.exercisesPerSet}>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>
            Name your workout:
            <input type="text" name="name" onChange={this.handleChange} sVal={this.state.name}></input>
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label>
            Please select desired exercises:
            <hr></hr>
            {<ExerciseGrid exercises={this.state.filteredExercises} addExToWorkout={this.addExToWorkout}/>}
          </label>
          <input type="submit" value="LET'S GO"/>
        </form>
      </div>
    )
  }
}


export default CreateWorkout; 