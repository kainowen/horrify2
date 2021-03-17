import React from 'react';
import classes from './DropdownArrow.module.css';
import { ReactComponent as DropdownArrow } from '../../../assets/chevron.svg';

const Arrow = (props) => {

    let styles = [classes.DropdownArrow];

    if (props.seeMore) {
      styles.push(classes.seeMore);
    }

    styles = styles.join(' ');

    return <DropdownArrow className={styles}/>;
  };

export default Arrow;
