import React from 'react';
import {connect} from 'react-redux';

import Settings from './Settings/Settings';
import List from '../../Shared/List/List';

const content = (props) => {
    let selectedOptionContent = null;

    if(props.selectedOption === 'settings'){
        selectedOptionContent = <Settings />;
    }else{
        if(props.selectedOption === 'favorites'){
            selectedOptionContent = <List list='favorites' user={props.userId}/>;
        }
        if(props.selectedOption === 'seen'){
            selectedOptionContent = <List list='seen' user={props.userId}/>
        }
    }

    return(
        <div>{selectedOptionContent}</div>
    )
}

const mapStateToProps = state => {
    return{
        selectedOption: state.profileReducer.selectedOption,
        userId: state.authReducer.userId,
    }
}

export default connect(mapStateToProps)(content);