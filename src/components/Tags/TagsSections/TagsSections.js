import React, { useState }  from 'react';
import Tag from '../Tag/Tag';
import classes from './TagsSections.module.css';
import DropdownArrow from '../../UI/DropdownArrow/DropdownArrow';

const TagSection = (props) => {
    let buttons = [];
    buttons.push(props.tags.map((tagName) => (
          <Tag
              key={tagName}
              name={tagName}
              clicked={() => props.clicked(tagName, props.tagGroup)}
              current={props.search[props.tagGroup]}
          />
      )
  ));

    //jscs:disable disallowArrayDestructuringReturn
    let [dropdownShow, toggle] = useState(false);

    let section = [classes.Section];
    if (dropdownShow) {
      section.push(classes.SeeLess);
    } else {
      section.push(classes.SeeMore);
    }

    return <div>
              <p
                  onClick={() => toggle(dropdownShow = !dropdownShow)}
                  style={{ cursor: 'pointer' }}>
                    { props.name }
                  <DropdownArrow seeMore={dropdownShow} />
              </p>
              <div className={section.join(' ')} > {buttons} </div>
          </div>;
  };

export default TagSection;
