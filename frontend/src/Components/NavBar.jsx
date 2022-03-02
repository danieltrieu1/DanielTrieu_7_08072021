import React, { Component } from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faEye,
  faPaperPlane,
  faUserCircle,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/icon-left-font-monochrome-white.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  handleLogout() {
    this.setState({ currentUser: false })
    AuthService.logout()
  }

  render() {
    return (
      <nav className="Navbar">

        <Link to={"/"} className="NavLogo">
          <img src={Logo} alt="Logo Groupomania" />
        </Link>

        <div className="NavbarLink">
          
          <li className="NavItem">
            <Link to={"/login"} className="NavLink">
              Login
            </Link>
          </li>

          <li className="NavItem">
            <Link to={"/signup"} className="NavLink">
              Sign up
            </Link>
          </li>

          {this.state.currentUser ? (
            <li className="NavItem">
              <Link to={"/profile"} className="NavLink">
                Mon Profil
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
            </li>
          ) : null}

          {this.state.currentUser ? (
            <li className="NavItem">
              <Link to={"/dashboard"} className="NavLink">
                Mon Dashboard
                <FontAwesomeIcon icon={faUserEdit} />
              </Link>
            </li>
          ) : null}

          {this.state.currentUser ? (
            <li className="NavItem">
              <Link to={"/post"} className="NavLink">
                Faire une Publication
                <FontAwesomeIcon icon={faPaperPlane} />
              </Link>
            </li>
          ) : null}

          {this.state.currentUser ? (
            <li className="NavItem">
              <Link to={"/forum"} className="NavLink">
                Voir le Forum
                <FontAwesomeIcon icon={faEye} />
              </Link>
            </li>
          ) : null}

          {this.state.currentUser ? (
            <li className="NavItem">
              <Link to={'/login'} className="NavLink" onClick={this.handleLogout}>
                Se déconnecter
                <FontAwesomeIcon icon={faClose} />
              </Link>
            </li>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default NavBar;
