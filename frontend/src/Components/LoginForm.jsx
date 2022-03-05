import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service"
import PostService from "../services/post.service";
import styled from "styled-components";
import { Link } from 'react-router-dom'

const PageWrapper = styled.div`
    z-index: 0;
    display: flex;
    justify-content: center;
    // background-color: white;
    opacity:0.97;
    height: 100%;
    margin: 1rem;
    border-radius: 1rem;
`

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
`

const FormCard = styled.form`

    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 20rem;
`

const CardTitle = styled.h2`
    font-size: 30px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center; 
    font-weight: 500;
    color: rgb(255, 87, 54);
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`
const FormLabel = styled.label`
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgb(13, 32, 89);
    text-decoration: none;
    margin: 0;
`

const FormInput = styled.input`
    z-index: 1;
    opacity: 1;
    border: none;
    padding: 10px;
    border-radius: 4px;
`

const StyledButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
    background-color: #ff5736;
    color: white;
    width: 100%;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    margin: 1rem;
    color: ;
`




export default class Login extends Component {

  constructor(props) {

    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          UserService.getAllUsers()
          PostService.getAllPosts()
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          console.log(error)
          this.setState({
            loading: false,
          });
        }
      );
  }
  render() {
    return (
      <PageWrapper>
        <Container>
          <CardTitle>Connecte-toi,<br/> On t'attend !</CardTitle>
          <FormCard
            onSubmit={this.handleLogin}
          >
            <FormGroup>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormInput
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </FormGroup>
            <FormGroup>
              <StyledButton
                className="button"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className=""></span>
                )}
                <span>Se connecter</span>
              </StyledButton>
              <StyledLink to='/signup'>Vous n'avez pas de compte ?</StyledLink>
            </FormGroup>
          </FormCard>
        </Container>
      </PageWrapper>
    );
  }
}
