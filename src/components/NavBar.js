import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ( { user, handleLogout } ) => {

  const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'black',
    textDecoration: 'none',
    color: 'cyan',
  }

  return (
    <header className="navbar">
      <h3>Dirty30</h3>
        {!user.id ? (
          <>
              <NavLink to="/">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
          </>
        ) : (
          <>
            <NavLink 
              to="/home"
              exact
              style={link}
              activeStyle={{
                textShadow: 'white'
            }}>home</NavLink>
            <NavLink 
              to="/browse"
              exact
              style={link}
              activeStyle={{
                textShadow: 'white'
            }}>browse</NavLink>
            <NavLink 
              to="/workouts/new"
              exact
              style={link}
              activeStyle={{
                textShadow: 'white'
                }}>plan workout</NavLink>
            <NavLink 
              to="/workout"
              exact
              style={link}
              activeStyle={{
                textShadow: 'white'
            }}>sweat</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
    </header>
  )
}

export default NavBar