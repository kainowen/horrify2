import React from 'react';
import ResultsBrief from '../ResultBrief';
import NavButton from '../../UI/ButtonEl/ButtonEl';
import Loading from '../../UI/Loading/Loading';

const ResultsPage = (props) => {

  let movieResultsList = <Loading />;
  movieResultsList = props.list.map((movie) => (
       <ResultsBrief
          key={movie.tmdbID}
          title={movie.title}
          nature={movie.nature}
          themes={movie.themes}
          tmdbID={movie.tmdbID}
          admin={props.admin}
          verify={props.verify}
          entry={movie}
          rating={movie.orderRating}
          />
  ));

  let prev = <NavButton clicked={props.clickedDown} name='previous' />;
  if (props.pageNo === 1) {
    prev = null;
  };

  let flexDirection = 'row-reverse';
  let next = <NavButton clicked={props.clickedUp} name='next'/>;
  if (props.lastPage) {
    next = null;
    flexDirection = 'row';
  };

  return (
        <div className='Container'>
          <div className='Row' style={{ flexDirection: flexDirection, height: '50px' }}>
              {next}
              {prev}
          </div>
          {movieResultsList}
          <div className='Row' style={{ flexDirection: flexDirection, height: '50px' }}>
              {next}
              {prev}
          </div>
        </div>
    );
};

export default ResultsPage;
