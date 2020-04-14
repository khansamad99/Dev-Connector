import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../actions/auth';
import PropTypes from 'prop-types';


const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

    const authLinks = (
        <ul>
            <li>
              <Link className="nav-link" to="/dashboard">
              <i className="fas fa-user"></i>{' '}
              <span className="hide-sm">Dashboard</span>
              </Link>
            </li>
            <li>
                <a onClick={logout} href='!#'>
                 <i className="fas fa-sign-out-alt"></i>{' '}
                 <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );

    return (
        <div>
            <nav className="navbar bg-dark">
             <h1>
                 <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {isAuthenticated ? authLinks : guestLinks}
      </nav>
        </div>
    )
}

Navbar.propTypes = {
    logout:PropTypes.func.isRequired,
    auth:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);