import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: rgb(255, 87, 54);
  color: white;

  padding: 10px;
  border-radius: 4px;
`

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: AuthService.getCurrentUser() };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="profileContainer card card-container">
        <div className="profileCardContent">
        <header>
          <h3>
            <strong>Bienvenue {currentUser.data.userData.username} !</strong>
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.data.accessToken.substring(0, 20)} ...{" "}
          {currentUser.data.accessToken.substr(currentUser.data.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.data.userData.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.data.userData.email}
        </p>
        <div className="profileCtrl">
            <li className="profileBtn">
                <StyledLink to={"/dashboard"}>
                  Modifier mon profil
                </StyledLink>
            </li>
            <li className="profileBtn">
                <StyledLink to={"/post"}>
                  Publier un message
                </StyledLink>
            </li>
            <li className="profileBtn">
                <StyledLink to={"/feed"}>
                  Voir le feed
                </StyledLink>
            </li>
            
            <StyledLink to={"/"}>
              <span>Se déconnecter</span>
            </StyledLink>
          </div>
        </div>
      </div>
    );
  }
}
