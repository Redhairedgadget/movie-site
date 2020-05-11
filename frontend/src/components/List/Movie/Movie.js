import React from 'react';

const movie = (props) => {
    return(
        <div>
            <h3>{props.title}</h3>
            <a target='_blank'  rel="noopener noreferrer" href={props.link}>
                <img src={props.poster} alt=""/>
            </a>
        </div>
    )
}

export default movie