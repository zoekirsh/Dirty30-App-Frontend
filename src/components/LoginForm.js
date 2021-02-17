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

  // handleSubmit = e => {
  //   e.preventDefault()
  //   let userData = {username: this.state.username, password: this.state.password}
  //   this.props.handleSubmit(userData)
  //   this.props.history.push("/home")
  // }

  render() {
    console.log(this.props)
    return (
      <div className="login">
        <form onSubmit={e => this.props.handleLoginOrSignup(e, this.state)}>
          <h1>{this.props.title}</h1>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={this.handleChange} 
              value={this.state.username}/>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={this.handleChange} 
              value={this.state.password}/>
          </div>
          <input type="submit" value={this.props.title}/>
        </form>
      </div>
    );
  }
}

export default LoginForm;