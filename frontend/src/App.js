import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './components/List/List';
import Profile from './components/Profile/Profile';
import Layout from './components/Layout/Layout';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Layout>
                <div>
                    <Switch>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/" exact component={List}/>
                    </Switch>
                </div>
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
