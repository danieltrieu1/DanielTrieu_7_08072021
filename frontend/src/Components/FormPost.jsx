import React, { Component } from "react";
import axios from "axios";
import AuthHeader from "../services/auth-header";
import AuthService from "../services/auth.service"
import styled from "styled-components";
import PostService from "../services/post.service";

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
    // z-index: 1;
    // opacity: 1;
    border: none;
    padding: 10px;
    border-radius: 4px;
`

const FormArea = styled.textarea`
    
    // z-index: 1;
    // opacity: 1;
    border: none;
    padding: 10px;
    border-radius: 4px;
    resize: none;
    height: 8rem;
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

class FormPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.state = {

      currentUser: AuthService.getCurrentUser(),

      title: "",
      content: "",
      user_id: "",
      selectedFile: null,
      loading: false,
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeContent(e) {
    this.setState({ content: e.target.value });
  }

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

    if (this.state.title !== "") {
      formData.append("title", this.state.title);
    }

    if (this.state.content !== "") {
      formData.append("content", this.state.content);
    }

    formData.append("user_id", this.state.currentUser.data.userData.id)

    axios
      .put(
        "http://127.0.0.1:8080/posts/",
        formData,
        { headers: AuthHeader() }
      )
      .then((response) => {
        PostService.getAllPosts()
        this.props.history.push("/forum");
        window.location.reload();
      })

      .catch((error) => console.log(error));
    }

  render() {
    return (
      <PageWrapper>
        <Container>
          <CardTitle>Rédige une publication !</CardTitle>

          <FormCard onSubmit={this.uploadHandler}>

                <FormGroup>
                <FormLabel htmlFor="title">Mettre un titre</FormLabel>
                <FormInput
                    type="text"
                    className="title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                />
                </FormGroup>

                <FormGroup>
                <FormLabel htmlFor="content">Contenu de la publication</FormLabel>
                <FormArea
                    type="text"
                    value={this.state.content}
                    onChange={this.onChangeContent}
                />
                </FormGroup>

                <FormGroup>
                <FormInput type="file" onChange={this.fileChangedHandler} />
                </FormGroup>

                <FormGroup>
                <StyledButton className="button" disabled={this.state.loading}>
                    {this.state.loading && <span className=""></span>}
                    Envoyer
                </StyledButton>
                </FormGroup>

          </FormCard>
        </Container>
    </PageWrapper>
    );
  }
}

export default FormPost;
