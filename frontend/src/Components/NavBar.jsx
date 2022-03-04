import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPaperPlane,
  faSignOut,
  faUserCircle,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/icon-left-font-monochrome-white.png";
import '../App.css'

const NavStyled = styled.nav`
  position: relative;
  // width: 100%;
  // z-index: 2;
  top: 0;
  left: 0;

  // height: 1rem;
  padding: 10px;
  // height: 5rem;
  background-color: rgb(255, 87, 54);
  box-shadow: 0px 0px 20px -5px black;
  opacity: 0.97;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 5px;
  color: white;
`;

const NavStyledElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  margin-right: 1rem; ////////////////////////////
`;

const NavLogo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  height: 30px;
  width: 170px;
`;

// .Navbar > .NavbarLink {
//   border: solid 3px red;
//   list-style-type: none;
//   display: flex;
//   justify-content: flex-end;
//   gap: 3rem;
// }

// .NavLink {
//   text-decoration: none;
//   color: white;
// }

// .NavLogo {
//   border: solid 3px red;
//   margin: 1rem;
// }

// .NavLogo > img {
//   max-height: 10rem;
//   max-width: 10rem;
// }

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  handleLogout() {
    this.setState({ currentUser: false });
    AuthService.logout();
  }

  render() {
    return (
      <NavStyled>
        <NavStyledElements>
          <StyledLink to={"/"} className="NavLogo">
            <NavLogo src={Logo} alt="Logo Groupomania" />
          </StyledLink>

          <NavLinks>

          {!this.state.currentUser ? (
            <StyledLink to={"/login"} className="NavLink">
              Login
            </StyledLink>) : null }

          {!this.state.currentUser ? (
            <StyledLink to={"/signup"} className="NavLink">
              Sign up
            </StyledLink>) : null }

            {this.state.currentUser ? (
              <StyledLink to={"/profile"} className="NavLink">
                Mon Profil
                <FontAwesomeIcon icon={faUserCircle} />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink to={"/dashboard"} className="NavLink">
                Mon Dashboard
                <FontAwesomeIcon icon={faUserEdit} />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink to={"/formpost"} className="NavLink">
                Faire une Publication
                <FontAwesomeIcon icon={faPaperPlane} />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink to={"/forum"} className="NavLink">
                Voir le Forum
                <FontAwesomeIcon icon={faEye} />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink
                to={"/login"}
                className="NavLink"
                onClick={this.handleLogout}
              >
                Se déconnecter
                <FontAwesomeIcon icon={faSignOut} />
              </StyledLink>
            ) : null}
          </NavLinks>
        </NavStyledElements>
      </NavStyled>
    );
  }
}

export default NavBar;
