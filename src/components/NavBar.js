import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'black',
    textDecoration: 'none',
    color: 'cyan',
  }

  return (
    <div className="navbar">
      <NavLink 
        to="/"
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
    </div>
  )
}

export default NavBar