import React from 'react';
import LoginForm from './LoginForm'

class Login extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <LoginForm history={this.props.history} title={this.props.title} userdata={this.props.userdata} handleSubmit={this.props.handleSubmit}/>
        <div>
          <button onClick={() => this.props.history.push("/signup")}>New User</button>
        </div>
      </div>
    );
  }
}

export default Login;