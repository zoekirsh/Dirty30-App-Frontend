import React from 'react';

const Home = (props) => {
  console.log(props)
  return (
    <div className='homepage'>
      <h2>User home page</h2>
      <div id="userstats">
        <h3>Welcome, {props.user.username}</h3>
        {/* <h4>Workouts completed: </h4> */}
      </div>
      <button onClick={() => props.history.push('/browse')}>Choose Workout</button>
    </div>
  )
}


export default Home; 