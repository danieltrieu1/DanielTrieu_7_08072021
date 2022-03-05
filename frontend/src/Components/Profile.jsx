import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose } from "@fortawesome/free-solid-svg-icons";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  // background-color: white;
  height: 100%;
  margin: 1rem;
  border-radius: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(237, 232, 232);
  border-radius: 1rem;
  // height: 100%;
  padding: 2rem;
  transition: all 0.4s ease-in-out;
  margin: 1rem;
  box-shadow: 0px 0px 20px -10px black;
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 20rem;
`;

const CardTitle = styled.h2`
  font-size: 30px;
  margin-top: 2rem;
  // margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  font-weight: 500;
  color: rgb(255, 87, 54);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ProfilePicture = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem;
`;

const ProfileImage = styled.img`
  // border: solid 3px red;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  background-color: #ff5736;
  color: white;
  // width: 100%;
`;

const StyledLinkLogout = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  color: #260c69;
`


class Profile extends Component {
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
    const { currentUser } = this.state;
    return (
      <PageWrapper>
        <Container>
          <FormCard>
            <header>
              <CardTitle>
                <strong>
                  Bienvenue {currentUser.data.userData.username} !
                </strong>
              </CardTitle>
              <ProfilePicture>
                <ProfileImage
                  src={this.state.currentUser.data.userData.attachment}
                  alt=""
                />
              </ProfilePicture>
            </header>
            {/* <p>
              <strong>Token:</strong>{" "}
              {currentUser.data.accessToken.substring(0, 20)} ...{" "}
              {currentUser.data.accessToken.substr(
                currentUser.data.accessToken.length - 20
              )}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.data.userData.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.data.userData.email}
            </p> */}

            <FormGroup>
              <StyledLink to={"/dashboard"}>Modifier mon profil</StyledLink>
              <StyledLink to={"/formpost"}>Publier un message</StyledLink>
              <StyledLink to={"/forum"}>Accèder aux publications</StyledLink>
            </FormGroup>

            <StyledLinkLogout className="LogoutBouton" onClick={this.handleLogout}>
              Se déconnecter
            </StyledLinkLogout>
            
          </FormCard>
        </Container>
      </PageWrapper>
    );
  }
}

export default Profile;
