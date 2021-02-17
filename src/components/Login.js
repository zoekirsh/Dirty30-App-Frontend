import React from 'react';
import LoginForm from './LoginForm'

class Login extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <LoginForm history={this.props.history} title={this.props.title} handleLoginOrSignup={this.props.handleLoginOrSignup}/>
      </div>
    );
  }
}

export default Login;