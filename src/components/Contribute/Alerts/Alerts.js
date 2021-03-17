import React from 'react';
import classes from  './alerts.module.css';

const Alerts = (props) => {

    let alertClasses = [classes.Alert];
    if (props.alerts.includes('adding')) {
      alertClasses.push(classes.Success);
    } else {
      alertClasses.push(classes.Fail);
    }

    alertClasses = alertClasses.join(' ');
    return (
        <div className={alertClasses}>
            {props.alerts}
        </div>
    );
  };

export default Alerts;
