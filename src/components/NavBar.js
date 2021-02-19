import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ( { user, handleLogout } ) => {

  return (
    <div>
      <h1 className="coolFont" >DIRTY<span className="red">30</span></h1>
      <nav className="navbar">
          {!user.id ? (
            <>
                <NavLink className="link" to="/">Login</NavLink>
                <NavLink className="link" to="/signup">Signup</NavLink>
            </>
          ) : (
            <>
              <NavLink 
                to="/home"
                exact
                className="link"
                activeStyle={{
                  textShadow: 'white'
              }}>Home</NavLink>
              <NavLink 
                to="/browse"
                exact
                className="link"
                activeStyle={{
                  textShadow: 'white'
              }}>Browse</NavLink>
              <NavLink 
                to="/workouts/new"
                exact
                className="link"
                activeStyle={{
                  textShadow: 'white'
                  }}>Plan Workout</NavLink>
              <NavLink 
                to="/workout"
                exact
                className="link"
                activeStyle={{
                  textShadow: 'white'
              }}>Sweat</NavLink>
              <a id="logout" className="link" onClick={handleLogout}>Logout</a>
            </>
          )}
      </nav>

    </div>
  )
}  

export default NavBar