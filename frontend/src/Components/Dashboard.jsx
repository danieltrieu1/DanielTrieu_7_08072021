import React, { Component } from "react";
import axios from "axios";
import AuthHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import styled from "styled-components";
import '../App.css'



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
  // max-width: 100%;
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
    UserService.getAllUsers()

    let users = JSON.parse(localStorage.getItem('allUsers'))
    
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
    this.state = {
      allUsers: users,
      currentUser: AuthService.getCurrentUser(),
      username: "",
      email: "",
      loading: false,
      selectedFile: null,
      reload: false
    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  deleteUser(e) {
    e.preventDefault();
    axios.delete(`http://127.0.0.1:8080/users/${this.state.currentUser.data.userData.id}`, { headers: AuthHeader() } )
      .then(() => {
        AuthService.logout();
        this.props.history.push("/signup");
        window.location.reload();
        this.setState({ currentUser: false });
      })
  }

  deleteUserById(e) {
    axios.delete(`http://127.0.0.1:8080/users/${e.target.id}`, { headers: AuthHeader() } )
      .then(() => {
        UserService.getAllUsers();
        window.location.reload()
      })
  }

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
          {this.state.currentUser.data.userData.isAdmin === 0 ? ( 
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
            <div>
              <StyledButton disabled={this.state.loading}>
                {this.state.loading && <span className=""></span>}
                <span>Enregistrer les modifications</span>
              </StyledButton>
            </div>
            <div>
              <StyledButton onClick={this.deleteUser}>Supprimer votre compte</StyledButton>
            </div>
          </FormCard>
        </Container>
        ) : 
        <div className="ensemble">
          <Container>
          <h1>Liste des utilisateurs</h1>
          <div className="nonon">
          {this.state.allUsers.map(user => (
            <div className="non" md="3" key={user.id}>
                <div className="card">
                <ProfilePicture>
                <ProfileImage
                  src={this.state.currentUser.data.userData.attachment}
                  alt=""
                />
              </ProfilePicture>
                    <p className="panpan1" key={user.username}>{user.username}</p>
                    <p className="panpan" key={user.email}>{user.email}</p>
                    <button className="btnbtn"
                        onClick={this.deleteUserById}
                        id={user.id}
                        label=""
                    >Supprimer
                    </button>
                </div>
            </div>
          ))}
          </div>
          </Container>
        </div>
        }
      </PageWrapper>
    );
  }
}