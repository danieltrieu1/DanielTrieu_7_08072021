import React, { Component } from "react";
import axios from "axios";
import AuthHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import styled from "styled-components";

const PageWrapper = styled.div`
  // z-index: 0;
  display: flex;
  justify-content: center;
  // background-color: white;
  opacity: 0.97;
  // height: 100%;
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
  min-width: 20rem;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const FormLabel = styled.label`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(13, 32, 89);
  text-decoration: none;
  margin: 0;
`;

const FormInput = styled.input`
  z-index: 1;
  opacity: 1;
  border: none;
  padding: 10px;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  background-color: #ff5736;
  color: white;
  width: 100%;
`;

const ProfilePicture = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImage = styled.img`
  // border: solid 3px red;

  border-radius: 50%;
  width: 10rem;
  height: 10rem;
`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),

      username: "",
      email: "",
      // password: "",
      loading: false,
      selectedFile: null,
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  // onChangePassword(e) {
  //   this.setState({ password: e.target.value });
  // }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  state = { selectedFile: null };

  uploadHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.selectedFile) {
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }

    if (this.state.email !== "") {
      formData.append("email", this.state.email);
    }

    if (this.state.username !== "") {
      formData.append("username", this.state.username);
    }
    axios
      .patch(
        "http://127.0.0.1:8080/users/" +
          this.state.currentUser.data.userData.id,
        formData,
        { headers: AuthHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response));
          window.location.reload();
        }
      }).then(alert('Vos changements ont bien été pris en compte !'))
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <PageWrapper>
        <Container>
          <ProfilePicture>
            <ProfileImage
              src={this.state.currentUser.data.userData.attachment}
              alt=""
            />
          </ProfilePicture>
          <FormGroup>
            <FormInput type="file" onChange={this.fileChangedHandler} />
          </FormGroup>
          <FormCard onSubmit={this.uploadHandler}>
            <FormGroup>
              <FormLabel htmlFor="username">Changer votre pseudo</FormLabel>
              <FormInput
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="email">Changer votre adresse mail</FormLabel>
              <FormInput
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </FormGroup>
            {/* <div className="form-group">
              <label htmlFor="password">Nouveau mot de passe</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="password">
                Confirmation de votre nouveau mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                name="changePwd"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div> */}
            <div>
              <StyledButton disabled={this.state.loading}>
                {this.state.loading && <span className=""></span>}
                <span>Enregistrer les modifications</span>
              </StyledButton>
            </div>

            <div>
              <StyledButton>Supprimer votre compte</StyledButton>
            </div>
          </FormCard>
        </Container>
      </PageWrapper>
    );
  }
}
