import React from 'react';
import Tag from '../Tag/Tag';
import Tags from '../Tags';
import classes from './Tagbar.module.css';
import { ReactComponent as Hitolo } from '../../../assets/order-hilo.svg';
import { ReactComponent as Lotothi } from '../../../assets/order-lohi.svg';

const Tagbar = (props) => {

    let bar = [classes.Bar];
    let inner = '';
    if (props.toggle) {
      bar.push(classes.SeeLess);
      inner = 'hide tags';
    } else {
      bar.push(classes.SeeMore);
      inner = 'show tags';
    }

    bar = bar.join(' ');

    return (
        <div className={bar}>
            <div className={'Container'}>
            <div className={classes.Box} style={{ marginRight: '-5px' }}>
                <a href='index.html'><h1> HORR-IFY </h1></a>
                  <Tag
                    name={inner}
                    current={''}
                    clicked={props.clicked}
                  />
            </div>
              <div style={{ marginBottom: '20px' }}>
                  <hr />
                  <p> select the tags you want to search by</p>
                  <Tags current={props.current}
                        search ={props.search}
                        clicked={props.tagsSelect}/>
                  <p onClick={props.orderClick}
                    className={classes.Rating}>
                    order by rating :
                    {props.order ?
                        <Hitolo
                        style={{
                            height: '20px',
                            marginLeft: '5px',
                          }} /> :
                        <Lotothi
                            style={{
                                height: '20px',
                                marginLeft: '5px',
                              }}/>}
                  </p>
              </div>
            </div>
        </div>
    );
  };

export default Tagbar;
