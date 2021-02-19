import React from 'react';

const Home = (props) => {
  console.log(props)
  return (
    <div className='homepage'>
      <div id="userstats">
        <h4>Welcome, {props.user.username}</h4>
        {/* <h4>Workouts completed: </h4> */}
      </div>
      <div id="choooseWorkout" className="glowButton" onClick={() => props.history.push('/browse')}>
        <h4 className="white">Choose Workout</h4>
      </div>
    </div>
  )
}


export default Home; 