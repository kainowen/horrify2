import React from 'react';
import classes from './ButtonEl.module.css';

const Button = (props) => (
        <button onClick={props.clicked} className={classes.Button}>
              {props.name}
        </button>
);

export default Button;
