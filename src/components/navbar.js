import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
class Navbar extends Component {
    render(){
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink exact activeClassName="select" to={'/'}>Home</NavLink></li>
                        <li><NavLink activeClassName="select" to={'/addproduct'}>Add User</NavLink></li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;