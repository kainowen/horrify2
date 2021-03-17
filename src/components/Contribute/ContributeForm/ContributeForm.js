import React from 'react';
import classes from '../Contribute.module.css';
import Alerts from '../Alerts/Alerts';
import SignUp from '../../SignUp/SignUp';
import Button from '../../UI/ButtonEl/ButtonEl';


const ContributeForm = (props) => {

  let form2 = null;
  let movTitle = Object.keys(props.entry);
  if (props.linkAdded) {
    form2 =
            <div style={{ width: '100%' }}>
              <h4> {movTitle}</h4>
                  <p>Decade: {props.movieYear}'s </p>
                  <p>Rating: {props.entry[movTitle].orderRating}</p>
              <label> is this movie a remake?
                  <input
                      id='movieRemake'
                      name='movieRemake'
                      type='checkbox'
                      onChange={props.formChange} />
              </label>
              <label className={classes.InputShell}> nature:
                  <select
                      defaultValue='supernatural' id='movieNature' name='movieNature'
                      type='text'
                      placeholder='supernatural'
                      className={classes.InputStyle}
                      onChange={props.formChange}>
                    <option value='natural' >Natural</option>
                    <option value='supernatural'>Supernatural</option>
                    <option value='ambiguous' >Ambiguous</option>
                  </select>
              </label>
              <label className={classes.InputShell}> themes:
                  <input
                      id='movieThemes'
                      name='movieThemes'
                      type='text'
                      placeholder='zombie, isolation'
                      className={classes.InputStyle}
                      onChange={props.formChange} />
              </label>
              <label className={classes.InputShell}> submit:
                  <input
                      id='submit'
                      name='submit'
                      type='submit'
                      className={classes.Submit}
                      onClick={props.formSubmit} />
              </label>
            </div>;
          }

          let alerts = null;
          if (props.alerts !== '') {
            alerts = <Alerts alerts={props.alerts} />;
          }

          const form1 =
                  <div>
                    <h4> Fill in the details below to add a movie</h4>
                    <Button clicked={props.howToClicked} name='learn how'/>
                    <form className={classes.FormShell} id='myForm'>
                      {alerts}
                      <label className={classes.InputShell}> TMDb link:
                        <input
                          id='movieID'
                          name='movieID'
                          type='url'
                          placeholder=
                          'eg. https://www.themoviedb.org/movie/10331-night-of-the-living-dead?language=en-US'
                          className={classes.InputStyle}
                          onChange={props.formChange} />
                        </label>
                        {form2}
                      </form>
                    </div>;

  return (
      <div>
        {props.loggedIn ? form1 :
          <SignUp
            userDetails={props.userDetails}
            login={props.login}
            signUp={props.signUp}
            signInError={props.signInError}
            />
          }
          {props.loggedIn ? <Button name='sign out' clicked={props.logout} /> : null}
      </div>
  );
};

export default ContributeForm;
