import React from 'react';

const Home = (props) => {
  console.log(props)
  return (
    <div className='homepage'>
      <div id="userstats">
        <h4>Welcome, {props.user.username}</h4>
        {/* <h4>Workouts completed: </h4> */}
      </div>
      <button onClick={() => props.history.push('/browse')}>Choose Workout</button>
    </div>
  )
}


export default Home; 