import React from 'react';

const Home = (props) => {
  console.log(props)
  return (
    <div className='homepage'>
      <h2>User home page</h2>
      <div id="userstats">
        <h3>Welcome, {props.user.username}</h3>
        <h4>Workouts completed: </h4>
        <h4>Weight: </h4>
        <h4>Height: </h4>
      </div>
    </div>
  )
}


export default Home; 