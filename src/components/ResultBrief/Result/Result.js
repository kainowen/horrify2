import React from 'react';
import Dropdown from './Dropdown';
import classes from '../Results.module.css';
import Button from '../../UI/ButtonEl/ButtonEl'
import { ReactComponent as List } from '../../../assets/list-solid.svg';

const Result = (props) => {

    let container = ['Container'];
    let text = '';
    if (props.seeMore) {
      container = ['Container', classes.Transition, classes.SeeMore];
      text = 'show less';
    } else {
      container = ['Container', classes.Transition, classes.SeeLess];
      text = 'show more';
    };

    let whereToWatch = "Not available to stream";
    if (props.whereToWatch !== "" && props.whereToWatch !== null && props.whereToWatch !== undefined){
      whereToWatch = props.whereToWatch;
    }

    let watchList;
    if (props.loggedIn && !props.onWatchlist){
      watchList = [classes.List, classes.Transition2, classes.Open];
    } else if (props.loggedIn && props.onWatchlist) {
      watchList = [classes.List, classes.Transition2, classes.Open, classes.OnWatchlist];
    } else {
      watchList = [classes.List, classes.Transition2, classes.Close];
    }

    watchList = watchList.join(' ');
    container = container.join(' ');
    return (
      <div>
        <div className={container}>
          <hr/>
          <div>
              <img
                  className={classes.ResultImg}
                  src={props.poster}
                  alt={props.title + ' poster '} />
                  {props.admin ? <Button name="verify" clicked={props.verify}/> : null}

              <div className={classes.TitleBox}>
                <h2> {props.title}</h2>
                <List className={watchList} onClick={(tltle, id) => props.addToWatchlist(props.title, props.id)} />
              </div>
              <div className='Row'>
                  <p style={{ marginBottom: '0' }}> Year: <br className={classes.HideOnLarge} />
                      {props.year}
                  </p>
                  <p style={{ marginBottom: '0' }}> Nature: <br className={classes.HideOnLarge} />
                      {props.nature}
                  </p>
                  <p style={{ marginBottom: '0' }}> Rating: <br className={classes.HideOnLarge} />
                      {props.iMDBrating}
                  </p>
              </div>
              <p> Themes: {props.themes}</p>
          </div>
          <p>{props.plot}</p>
          <p>watch on: {whereToWatch}</p>
      </div>
        <Dropdown clicked={props.clicked} seeMore={props.seeMore}> {text} </Dropdown>
    </div>);

  };

export default Result;
