import React from 'react';
import classes from './Loading.module.css';

const Loading = (props) => {

  let slideClass = [classes.Scroller, classes.ScrollerStart];

  setTimeout(function () {slideClass = [classes.Scroller, classes.ScrollerEnd];}, 1000);

  slideClass = slideClass.join(' ');
  return (
      <div className={classes.Center}>
          <p> Loading... </p>
          <div className={classes.LoadBar}><div className={slideClass}></div></div>
      </div>);
};

export default Loading;
