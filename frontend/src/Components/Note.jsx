import React, { Component } from "react";
import axios from "axios";
import AuthHeader from "../services/auth-header";
import AuthService from "../services/auth.service"
import styled from "styled-components";

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

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {

      currentUser: AuthService.getCurrentUser(),

      title: "",
      content: "",
      user_id: "",
      postId: "",
      selectedFile: null,
      loading: false,
    };
  }

  render() {
    return (
      <PageWrapper>
        <Container>

        </Container>
    </PageWrapper>
    );
  }
}

export default Note;
