import React from 'react';

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let userData = {username: this.state.username, password: this.state.password}
    this.props.handleSubmit(userData)
    this.props.history.push("/home")
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h1>{this.props.title}</h1>
        <div>
          <input type="text" name="username" placeholder="Username" onChange={e => this.handleUsername(e)} value={this.state.username}/>
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" onChange={e => this.handlePassword(e)} value={this.state.password}/>
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value={this.props.title}/>
      </form>
    );
  }
}

export default LoginForm;