import React, { Component } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import styled from "styled-components";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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

const AdminWrapper = styled.div`
  width: 100%;
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

const UserCard = styled.div`
  padding: 1rem;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;

const CardContent = styled.div`
  max-width: 12rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: white;
  padding: 1rem;
  border-radius: 2rem;
  box-shadow: 0px 0px 20px -5px lightgrey;
`;

const UserInsert = styled.span`
  font-size: 20px;
  display: flex;
  font-weight: 700;
  justify-content: center;
  color: rgb(255, 87, 54);
`;

const DeleteButtonStyled = styled.button`
  cursor: pointer;
  // position: relative;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 10px;
  border-radius: 10rem;
  transition: all 0.4s ease;
  color: grey;

  &:hover {
    box-shadow: 0px 0px 10px -5px lightgrey;
    transition: all 0.4s ease-in-out;
    background-color: rgb(255, 87, 54);
    color: white;
  }
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
    userService.getAllUsers();
    let users = JSON.parse(localStorage.getItem("allUsers"));

    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
    this.state = {
      allUsers: users,
      currentUser: authService.getCurrentUser(),
      username: "",
      email: "",
      loading: false,
      selectedFile: null,
      reload: false,
    };
  }

  // getAllUsers() {
  //   if(!this.getCurrentUser) {
  //     return this.users.filter(role => role.isAdmin === 1 && !role.isAdmin === 0)
  //   }

  //   if(!this.catchUser) {
  //     return this.users.filter(element => element.Roles[1] && !element.Roles[2]);
  //   } else if(this.catchUser) {
  //     return this.users.filter(element => element.pseudo == this.searchUser && element.Roles[1] && !element.Roles[2])
  //   }
  // },

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
    axios
      .delete(
        `http://127.0.0.1:8080/users/${this.state.currentUser.data.userData.id}`,
        { headers: authHeader() }
      )
      .then(() => {
        authService.logout();
        this.props.history.push("/signup");
        window.location.reload();
        this.setState({ currentUser: false });
      });
  }

  deleteUserById(e) {
    axios
      .delete(`http://127.0.0.1:8080/users/${e.currentTarget.id}`, {
        headers: authHeader(),
      })
      .then(() => {
        userService.getAllUsers();
        window.location.reload()
      });
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
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response));
          window.location.reload();
        }
      })
      // .then(alert("Vos changements ont bien été pris en compte !"))
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
                <FormLabel htmlFor="email">
                  Changer votre adresse mail
                </FormLabel>
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
                <StyledButton onClick={this.deleteUser}>
                  Supprimer votre compte
                </StyledButton>
              </div>
            </FormCard>
          </Container>
        ) : (
          // this.state.getAllUsers.filter(role => role.isAdmin = 1 && !role.isAdmin === 0 ) (

          <AdminWrapper>
            <Container>
              <h1>Admin Dashboard</h1>
              <span>Profils de tout les utilisateurs inscrits</span>
              <UserCard>
                {this.state.allUsers.map((user) => (
                  <div className="" md="3" key={user.id}>
                    <CardContent>
                      <ProfilePicture>
                        <ProfileImage
                          src="./assets/icone-utilisateur-gris.png"
                          alt=""
                        />
                      </ProfilePicture>
                      <UserInsert key={user.username}>
                        {user.username}
                      </UserInsert>
                      <UserInsert key={user.email}>{user.email}</UserInsert>
                      <DeleteButtonStyled
                        onClick={this.deleteUserById}
                        id={user.id}
                        label=""
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </DeleteButtonStyled>
                    </CardContent>
                  </div>
                ))}
              </UserCard>
            </Container>
          </AdminWrapper>
        )}
      </PageWrapper>
    );
  }
}
