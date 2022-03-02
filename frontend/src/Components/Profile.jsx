import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { 
      currentUser: AuthService.getCurrentUser(),
    }
  }

  handleLogout() {
    this.setState({ currentUser: false })
    AuthService.logout()
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
            <div className="logoutBtn">
            <Link to={'/login'} className="NavLink" onClick={this.handleLogout}>
                Se déconnecter
                <FontAwesomeIcon icon={faClose} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Profile