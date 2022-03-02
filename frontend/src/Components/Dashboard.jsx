import React, { Component } from "react";
import axios from "axios";
import AuthHeader from '../services/auth-header'
import AuthService from "../services/auth.service";
// import styled from "styled-components";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      email: "",
      // password: "",
      loading: false,
      currentUser: AuthService.getCurrentUser(),

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

  uploadHandler = () => {
    const formData = new FormData()
    if(this.state.selectedFile) {
      formData.append(
        'file',
        this.state.selectedFile,
        this.state.selectedFile.name
      )
    }

    if(this.state.email!==""){
      formData.append(
        'email', this.state.email
      )
    }

    if(this.state.username!=="") {
      formData.append(
        'username', this.state.username 
      )
    }



    axios.patch('http://127.0.0.1:8080/users/' + this.state.currentUser.data.userData.id, formData, {headers: AuthHeader()})
  }

  render() {
    return (

      <div className="col-md-12">
          

        <div className="card card-container">
          <div className="profilePicture">
            <img src="../assets/merguez.jpeg" alt="" />
          </div>
          <div className="form-group">
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Changer votre pseudo</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Changer votre adresse mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
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
            <div className="form-group">
              <button  className="button" disabled={this.state.loading}>
                {this.state.loading && <span className=""></span>}
                <span>Enregistrer les modifications</span>
              </button>
            </div>

            <div className="deleteBtn">
              <button>
                <span>Supprimer votre compte</span>
              </button>
            </div>
          </form>
        </div> 
      </div>
    );
  }
}
