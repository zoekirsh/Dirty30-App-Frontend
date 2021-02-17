import React from 'react';

const Logout = (props) => {
  return (
    <div>
      <h3>You have successfully logged out.</h3>
      <br></br>
      <button onClick={() => props.history.push("/")}>back to login</button>
    </div>
  )
}

export default Logout;