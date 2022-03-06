import React, { Component } from "react";
// import AuthService from "../services/auth.service";
import postService from "../services/post.service";
import noteService from "../services/note.service";
import authService from "../services/auth.service";
import authHeader from "../services/auth-header";
import "../App.css";
import Logo from "../assets/icon-left-font-monochrome-white.png";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaperPlane, faTrashAlt, faXmark } from "@fortawesome/free-solid-svg-icons";

const PageWrapper = styled.div`
  z-index: 0;
  display: flex;
  justify-content: center;
  background-color: white;
  // opacity: 0.97;
  height: 100%;
  // margin: 1rem;
  // border-radius: 1rem;
`;

const PostContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  background: rgb(255, 233, 199);
  background: linear-gradient(
    0deg,
    rgba(255, 233, 199, 1) 0%,
    rgba(255, 204, 124, 1) 100%
  );
`;
const PostBoxStyled = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 10rem;
  padding: 2rem;
  gap: 1rem;
  background-color: white;
  flex-direction: column-reverse;
`;

const PostCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  box-shadow: 0px 0px 20px -10px grey;
  border-radius: 10px;
  background-color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  max-width: 30rem;
  height: auto;
`;

const AttachmentStyled = styled.img`
  object-fit: cover;
  max-width: 100%;
  height: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const LogoPage = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    width: 11rem;
    height: 3rem;
    color:#d5d5d5;
`

const DeleteButtonStyled = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  float: right;
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

const DeleteNoteButtonStyled = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  float: right;
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
    background-color: grey;
    color: white;
  }
  `;

const ButtonStyled = styled.button`
  // position: relative;
  background-color: rgb(255, 87, 54);
  color: white;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 2rem;
  transition: all 0.4s ease;
  // width: 10rem;
  // margin: 1rem;
  // width: fit-content;
  // border: solid 2px red;
  margin-bottom: 1rem;
  // margin-left: 11rem;
  // margin-right: 11rem;

  &:hover {
    box-shadow: 0px 0px 10px -5px grey;
    transition: all 0.4s ease-in-out;
    background-color: rgb(255, 87, 54);
    color: white;
  }
`;

const ContentPostStyled = styled.div`
  background-color: white;
  padding: 10px;
`;

const PostTitleStyled = styled.h2`
  color: rgb(255, 87, 54);
  font-size: 30px;
`;
const PostTextStyled = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const FormInput = styled.textarea`
  margin: 10px;
  border-radius: 4px;
  padding: 10px;
  border: none;
  background-color: #f5f5f5;
  resize: none;
`;

const NoteBox = styled.div`
  display: flex;
  flex-direction: column;
  // border: solid 2px red;
  min-height: 5rem;
  padding: 10px;
  gap: 10px;
  max-height: 8rem;
  overflow-y: scroll;
  background-color: #f5f5f5;
  // background-color: lightblue;
`;

const NoteArea = styled.div` 
  color: rgb(54, 54, 54);
  border-radius: 5px;
  background-color: #e5e5e5;
  // border: solid 3px red;
  padding: 1rem;
  // margin: 1rem;
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // min-width: 15rem;
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

// const FormArea = styled.textarea`

//     // z-index: 1;
//     // opacity: 1;
//     border: none;
//     padding: 10px;
//     border-radius: 4px;
//     height: 8rem;
// `

// const StyledButton = styled.button`
//     cursor: pointer;
//     border: none;
//     border-radius: 4px;
//     padding: 10px;
//     font-size: 16px;
//     background-color: #ff5736;
//     color: white;
//     width: 100%;
// `

class Forum extends Component {
  constructor(props) {
    postService.getAllPosts();
    authService.getCurrentUser();
    super(props);

    this.deletePostById = this.deletePostById.bind(this);
    this.deleteNoteById = this.deleteNoteById.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = {
      currentUser: authService.getCurrentUser(),
      content: "",
      allPosts: JSON.parse(localStorage.getItem("posts")),
      loading: false,
    };
    console.log(this.state.allPosts)
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeContent(e) {
    this.setState({ content: e.target.value });
  }

  uploadHandler(e) {
    e.preventDefault()
    const Content = {
      content: this.state.content,
      user_id: this.state.currentUser.data.userData.id,
      PostId: e.currentTarget.id
    }

    axios
      .put("http://127.0.0.1:8080/notes/", Content, { headers: authHeader() })
      .then(() => {
        axios.get("http://127.0.0.1:8080/posts/", {
          headers: authHeader()
        })
        .then(response => {
            localStorage.setItem("posts", JSON.stringify(response.data));
            this.setState({ allPosts: JSON.parse(localStorage.getItem("posts")) });
            this.setState({ content: "" });
        });
      })

      .catch((error) => console.log(error));
  }

  deletePostById(e) {
    axios
      .delete(`http://127.0.0.1:8080/posts/${e.currentTarget.id}`, {
        headers: authHeader(),
      })
      .then(() => {
        axios.get("http://127.0.0.1:8080/posts/", {
          headers: authHeader()
        })
        .then(response => {
            localStorage.setItem("posts", JSON.stringify(response.data));
            this.setState({ allPosts: JSON.parse(localStorage.getItem("posts")) });
        });
      });
  }

  deleteNoteById(e) {
    e.preventDefault();
    axios
      .delete(`http://127.0.0.1:8080/notes/${e.currentTarget.id}`, {
        headers: authHeader(),
      })
      .then(() => {
        axios.get("http://127.0.0.1:8080/posts/", {
          headers: authHeader()
        })
        .then(response => {
            localStorage.setItem("posts", JSON.stringify(response.data));
            this.setState({ allPosts: JSON.parse(localStorage.getItem("posts")) });
        });
      });
  }

  render() {
    return (
      <PageWrapper>
      

        <PostContainerStyled>
          <header>
            <LogoPage src={Logo} alt="Logo Groupomania" />
          </header>
          <PostBoxStyled>
            {this.state.allPosts.map((post) => (
              <PostCardStyled key={post.content}>
                <ContentPostStyled>
                <DeleteButtonStyled
                        onClick={this.deletePostById}
                        id = {post.id}
                      >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </DeleteButtonStyled>
                  {/* <span className="userIdPost">{`${post.user_id}`}</span> */}
                  <PostTitleStyled>"{`${post.title}`}"</PostTitleStyled>
                  <PostTextStyled>{`${post.content}`}</PostTextStyled>
                  <AttachmentStyled src={`${post.attachment}`} alt="" />

                  <NoteBox>
                     {post.Notes.map((note) => (
                       <NoteArea key={note.id}>
                         {note.content}
                         <DeleteNoteButtonStyled
                           onClick={this.deleteNoteById}
                           id={note.id}
                         >
                           <FontAwesomeIcon icon={faClose} />
                         </DeleteNoteButtonStyled>
                       </NoteArea>
                     ))}
                   </NoteBox>

                </ContentPostStyled>


                <FormCard>
                   <FormGroup>
                     <FormLabel htmlFor="content"></FormLabel>
                     <FormInput
                      type="text"
                      value={this.state.content}
                      placeholder="Écrire un commentaire ..."
                      onChange={this.onChangeContent}
                    />
                    <ButtonStyled
                      id={post.id}
                      onClick={this.uploadHandler}
                      disabled={this.state.loading}
                    >
                      {this.state.loading && <span className=""></span>}
                      <span>Envoyer</span>
                    </ButtonStyled>
                  </FormGroup>
                </FormCard>
                
              </PostCardStyled>
            ))}
          </PostBoxStyled>
        </PostContainerStyled>


      </PageWrapper>
    );
  }
}

export default Forum;
