import React from 'react';

const ResultHeader = (props) => {

    let message = '';

    //jscs:disable maximumLineLength
    if (props.search.decade === '' && props.search.nature === '' &&      props.search.theme.length <= 0) {
      message = 'Showing top rated horror movies on TMDb';
    } else {
      message = 'Search results for ';

      if (props.search.nature !== '') {
        message = message + props.search.nature;
      }

      message = message + ' horror movies';

      if (props.search.decade !== '') {
        message = message + ' from the ' + props.search.decade + "'s";
      }

      if (props.search.theme.length > 0) {
        message = message + ' with the following themes: \n ' + props.search.theme.join(', ');
      }
    }

    return (
      <div className='Container Centered'>
        <h4 style={{ margin: '30px 0 0 0' }} >{ message } </h4>
      </div>
    );
  };

export default ResultHeader;
