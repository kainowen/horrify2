import React from 'react';
import classes from '../Results.module.css';
import DropdownArrow from '../../UI/DropdownArrow/DropdownArrow';

const Dropdown = (props) => {

    let footer = ['Container', classes.Footer];
    footer = footer.join(' ');

    return (
      <div className={footer} onClick={props.clicked}> {props.children}
            <DropdownArrow seeMore={props.seeMore} />
        </div>
    );
  };

export default Dropdown;
