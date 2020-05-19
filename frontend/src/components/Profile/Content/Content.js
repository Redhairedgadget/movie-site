import React from 'react';
import {connect} from 'react-redux';

import Settings from './Settings/Settings';
import List from '../../List/List';

const content = (props) => {

    let selectedOptionContent = null;

    if(props.selectedOption === 'settings'){
        selectedOptionContent = <Settings />;
    }else{
        if(props.selectedOption === 'favorites'){
            selectedOptionContent = <List list='favorites'/>;
        }else{
            selectedOptionContent = <List list='seen' />
        }
    }

    return(
        <p>{selectedOptionContent}</p>
    )
}

const mapStateToProps = state => {
    return{
        selectedOption: state.profileReducer.selectedOption,
    }
}

export default connect(mapStateToProps)(content);