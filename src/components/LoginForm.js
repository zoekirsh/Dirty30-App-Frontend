import React from 'react';

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    // console.log(this.props)
    return (
      <div className="login">
        <form onSubmit={e => this.props.handleLoginOrSignup(e, this.state)}>
          <h2>TOUGH WORKOUTS. ONLY 30 MINUTES.</h2>
          <div className="username">
            <label className="formLabel" htmlFor="username">Username</label>
            <br/>
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={this.handleChange} 
              value={this.state.username}/>
          </div>
          <div className="password">
            <label className="formLabel" htmlFor="password">Password</label>
            <br/>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={this.handleChange} 
              value={this.state.password}/>
          </div>
          <input id="loginBtn" className="glowButton" type="submit" value={this.props.title}/>
        </form>
      </div>
    );
  }
}

export default LoginForm;