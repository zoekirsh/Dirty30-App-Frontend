import React from 'react'
import WorkoutGrid from './WorkoutGrid'

class Browse extends React.Component {
   state = {
      userWorkouts: [],
      allWorkouts: []
   }

   componentDidMount() {
      this.setState({
         userWorkouts: this.props.data.currentUser.userWorkouts,
         allWorkouts: this.props.data.allWorkouts
      })
   }

   render() {
      return(
         <div className="browseContainer">
            <WorkoutGrid workouts={this.state.userWorkouts} />
            <hr/>
            <WorkoutGrid workouts={this.state.allWorkouts} />
         </div>
      )
   }
}

export default Browse