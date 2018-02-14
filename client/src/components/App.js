import 'materialize-css/dist/css/materialize.min.css'; 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import DashBoard from './DashBoard';

class App extends Component {

    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />               
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={DashBoard} />                    
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);