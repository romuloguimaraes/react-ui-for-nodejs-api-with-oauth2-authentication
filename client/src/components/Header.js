import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../css/base.css';
import '../css/buttons.css';

class Header extends Component{

    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google" className="btn white blue-text btn-google-login">Login with Google</a></li>
                );
            default:
                return (
                    <li><a href="/api/logout" className="btn blue accent-3 btn-logout">Logout</a></li>
                );
        }
    }

    render(){
        return (
            <nav>
            <div className="nav-wrapper blue accent-4 wrapper">
              <Link to={this.props.auth ? '/dashboard' : '/'} className="left brand-logo">React & Node OAuth2</Link>
              <ul className="right">
               {this.renderContent()}
              </ul>
            </div>
          </nav>
        )
    }
}

function mapStateToPros({ auth }){
    return {auth: auth};
}

export default connect(mapStateToPros)(Header);