import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import List from './components/List/List';
import Profile from './components/Profile/Profile';
import Layout from './hoc/Layout/Layout';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout'
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSign();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={List}/>
                <Redirect to="/"/>
            </Switch>
        );

        if(this.props.isAuth){
            routes=(
                <Switch>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={List}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
    return (
        <BrowserRouter>
            <Layout>
                {routes}
            </Layout>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
    return{
        isAuth: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onTryAutoSign: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
