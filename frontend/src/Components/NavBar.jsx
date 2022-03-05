import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPaperPlane,
  faPowerOff,
  faSignIn,
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

  @media (max-width: 1200px) {
    height:2rem;
    display: flex;
    justify-content:center;
      flex-direction: row;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 5px;
  color: white;
  @media (max-width: 1200px) {
    gap: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
`;

const LinkArea = styled.span`
  @media (max-width: 1200px) {
    display: none;
    visibility: hidden;
  }
`

const NavStyledElements = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  margin-left: 10px;
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
  margin-right: 1rem;
  margin-left: 10px;
  @media (max-width: 500px) {
    display: none;  
    visibility: hidden;
  }

`;

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
              <LinkArea>Se connecter</LinkArea>
              <FontAwesomeIcon icon={faPowerOff} display="none" />
            </StyledLink>) : null }

          {!this.state.currentUser ? (
            <StyledLink to={"/signup"} className="NavLink">
              <LinkArea>S'inscrire</LinkArea>
              <FontAwesomeIcon icon={faSignIn} display="none" />
            </StyledLink>) : null }

            {this.state.currentUser ? (
              <StyledLink to={"/profile"} className="NavLink">
                <LinkArea>Mon Profil</LinkArea>
                <FontAwesomeIcon icon={faUserCircle} display="none" />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink to={"/dashboard"} className="NavLink">
                <LinkArea>Mon Dashboard</LinkArea>
                <FontAwesomeIcon icon={faUserEdit} display="none" />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink to={"/formpost"} className="NavLink">
                <LinkArea>Rédiger une Publication</LinkArea>
                <FontAwesomeIcon icon={faPaperPlane} display="none" />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink to={"/forum"} className="NavLink">
                <LinkArea>Accéder au Forum</LinkArea>
                <FontAwesomeIcon icon={faEye} display="none" />
              </StyledLink>
            ) : null}

            {this.state.currentUser ? (
              <StyledLink
                to={"/login"}
                className="NavLink"
                onClick={this.handleLogout}
              >
                <LinkArea>Se déconnecter</LinkArea>
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
