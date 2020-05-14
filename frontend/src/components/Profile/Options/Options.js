import React, {useState} from 'react';
import {connect} from 'react-redux';
import styles from './Options.module.css'

import * as actions from '../../../store/actions/index';

const options = (props) =>{
    const [optionList, changeOptionList] = useState([
        {id: 0, option:'settings', title: 'Settings'},
        {id: 1, option:'bookmark', title: 'Want to see'},
        {id: 2, option:'seen', title: 'Seen'}
    ])

    const options = optionList.map(option => {
        return <li onClick={()=> props.onSelect(option.option)} key={option.id}>{option.title}</li>
    })

    return(
        <React.Fragment>
            <p>here will be options:</p>
            <ul>
                {options}
            </ul>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onSelect: (option) => dispatch(actions.setOption(option)),
    }
}
export default connect(null, mapDispatchToProps)(options);