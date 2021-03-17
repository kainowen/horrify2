import React from 'react';
import classes from './Tag.module.css';

const Tag = (props) => {

    let tagClasses = [classes.Tag];

    if (props.name === props.current) {
      tagClasses.push(classes.TagActive);
    }

    //jscs:disable maximumLineLength
    if (!Array.isArray(props.current) && props.name !== props.current && props.current !== '') {
      tagClasses.push(classes.TagDisable);
    }

    if (Array.isArray(props.current) && props.current.includes(props.name)) {
      tagClasses.push(classes.TagActive);
    }

    tagClasses = tagClasses.join(' ');

    return (
        <button className={tagClasses} onClick={props.clicked}>
            {props.name}
        </button>
    );
  };

export default Tag;
