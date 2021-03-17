import React from 'react';
import TmdbLogo from '../../assets/tmdblogo.svg';
import classes from './Footer.module.css';

const Footer = (props) => (
      <footer className={classes.Footer}>
        <div className='Container'>
          <p>powered by
            <a
                href='https://www.themoviedb.org/?language=en-US'
                target='_blank' rel='noreferrer noopener'>
                <img
                    className={classes.TmdbLogo}
                    src={TmdbLogo}
                    alt='The Movie Database Logo'/>
            </a>
          </p>
        </div>
      </footer>
);

export default Footer;
