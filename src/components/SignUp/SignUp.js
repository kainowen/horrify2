import React from 'react';
import Button from '../UI/ButtonEl/ButtonEl';
import classes from './SignUp.module.css';
import Alerts from  '../Contribute/Alerts/Alerts';

const SignUp = (props) => {

  let alerts = null;
  if (props.signInError !== '') {
    alerts = <Alerts alerts={props.signInError} />;
  }

  return (
    <div className='Container'>
      <div>
        <form>
          <p> Sign in to contribute </p>
          {alerts}
          <div className={classes.FormInputs}>
            <label className={classes.Label}>your email: <input type='email' placeholder='email@example.com' id='userEmail' onChange={props.userDetails} /></label>
            <label className={classes.Label}>your password: <input type='password' placeholder="********" id='userPass' onChange={props.userDetails} /></label>
          </div>
        </form>
        <div className={classes.ButtonDiv}>
          <Button name="log in" clicked={props.login} />
          <Button name="sign up" clicked={props.signUp} />
        </div>
      </div>
    </div>
  )

};

export default SignUp;
