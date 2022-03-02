import React, { Component } from "react";
import axios from "axios";
// import styled from "styled-components";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      selectedFile: null
    }
    this.state = {
      username: "",
      email: "",
      password: "",
      changePwd: false,
      loading: false,
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  state = { selectedFile: null };

  uploadHandler = () => {
    const formData = new FormData()
    formData.append(
      'file',
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.post('http://127.0.0.1:8080', formData)
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
            <button
              className="button"
              disabled={this.state.loading}
              onClick={this.uploadHandler}
            >
              <span>Modifier l'image du profil</span>
            </button>
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
              <label htmlFor="username">Changer votre adresse mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Changer votre mot de passe</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Confirmation de votre mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                name="changePwd"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group">
              <button className="button" disabled={this.state.loading}>
                {this.state.loading && <span className=""></span>}
                <span>Modifier</span>
              </button>
            </div>
            <div className="form-group">
              <button className="button" disabled={this.state.loading}>
                {this.state.loading && <span className=""></span>}
                <span>Supprimer votre compte</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
