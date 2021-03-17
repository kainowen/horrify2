import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../ButtonEl/ButtonEl';

const Modal = (props) => (

    //jscs:disable maximumLineLength
          <div>
              <Backdrop show={props.show} clicked={props.clicked}/>
              <div
                  className={classes.Modal}
                  style={{
                      transform: props.show ? 'opacity(100%)' : 'opacity(0%)',
                      opacity: props.show ? '1' : '0',
                    }}>
                  <h4> how to add a movie: </h4>
                  <p> Step 1: Find the movie you want to add on
                      <a
                          href='https://www.themoviedb.org/movie?language=en-US'
                          target='_blank'
                          rel='noreferrer noopener'>themoviedb.org
                      </a>
                  </p>
                  <p> Step 2: Copy the movies URL and paste it into the first box below</p>
                  <p> Step 3: if the movie is a remake or has been remade check the box</p>
                  <p> Step 4: Select the 'Nature' of the movie</p>
                  <ul>
                      <li> Natural: If the movie is entirly possible today</li>
                      <li> Supernatural: If the counldn't happen today (including sci-fi)</li>
                      <li> Ambiguous: If it's unclear whether theres something supernatural happening or if labelling it would be a spoiler</li>
                  </ul>
                  <p> Add the tags. Try to use tags we already have listed unless unavoidable.</p>
                  <p> Make sure each tag is separated with a comma and space e.g 'slasher, mystery, comedy'</p>
                  <Button clicked={props.clicked} name='got it' />
              </div>
          </div>
 );

export default Modal;
