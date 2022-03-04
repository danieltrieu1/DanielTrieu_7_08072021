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
  background-color: rgb(255, 87, 54);
  // border-radius: 1rem;
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
const DeleteButtonStyled = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  float: right;
  border: none;
  padding: 10px;
  border-radius: 2rem;
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0px 0px 10px -5px lightgrey;
    transition: all 0.4s ease-in-out;
    background-color: grey;
    color: white;
  }
`;

const ButtonStyled = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  border: none;
  padding: 10px;
  border-radius: 2rem;
  transition: all 0.4s ease;
  width: fit-content;

  &:hover {
    box-shadow: 0px 0px 10px -5px lightgrey;
    transition: all 0.4s ease-in-out;
    background-color: grey;
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
  border: solid 2px red;
  height: fit-content;
  padding: 10px;
`;

const FormCard = styled.form`

    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 20rem;
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

const FormArea = styled.textarea`
    
    // z-index: 1;
    // opacity: 1;
    border: none;
    padding: 10px;
    border-radius: 4px;
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

class Forum extends Component {
  constructor(props) {
    postService.getAllPosts();
    // noteService.getAllNotes();

    authService.getCurrentUser();

    let posts = JSON.parse(localStorage.getItem("posts"));

    super(props);

    this.deletePostById = this.deletePostById.bind(this);
    this.deleteNoteById = this.deleteNoteById.bind(this);

    this.onChangeContent = this.onChangeContent.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);

    this.state = {
      currentUser: authService.getCurrentUser(),

      content: "",
      // postValue: "",
      noteValue: "",

      allPosts: posts,

      loading: false,
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeContent(e) {
    this.setState({ content: e.target.value });
  }

  uploadHandler(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", this.state.currentUser.data.userData.id)

    if (this.state.title !== "") {
      formData.append("title", this.state.title);
    }

    if (this.state.content !== "") {
      formData.append("content", this.state.content);
    }

    axios
      .put(
        "http://127.0.0.1:8080/notes/",
        formData,
        { headers: authHeader() }
      )
      .then((response) => {
        this.props.history.push("/forum");
        window.location.reload();
      })

      .catch((error) => console.log(error));
    }


  deletePostById(e) {
    e.preventDefault();
    // console.log(e.target.id);
    axios
      .delete(`http://127.0.0.1:8080/posts/${e.target.id}`, {
        headers: authHeader(),
      })
      .then(() => {
        postService.getAllPosts();
        window.location.reload();
      });
  }

  deleteNoteById(e) {
    e.preventDefault();
    axios
      .delete(`http://127.0.0.1:8080/notes/${e.target.id}`, {
        headers: authHeader(),
      })
      .then(() => {
        noteService.getAllNotes();
        window.location.reload();
      });
  }

  render() {
    return (
      <PageWrapper>
        <PostContainerStyled>
          <header>
            <img className="LogoForum" src={Logo} alt="Logo Groupomania" />
          </header>
          <PostBoxStyled>
            {this.state.allPosts.map((post) => (
              <PostCardStyled key={post.content}>
                <ContentPostStyled>
                  <DeleteButtonStyled
                    onClick={this.deletePostById}
                    id={post.id}
                  >
                    Supprimer
                  </DeleteButtonStyled>
                  {/* <span className="userIdPost">{`${post.user_id}`}</span> */}
                  <PostTitleStyled>"{`${post.title}`}"</PostTitleStyled>
                  <PostTextStyled>{`${post.content}`}</PostTextStyled>
                  <AttachmentStyled src={`${post.attachment}`} alt="" />

                  <NoteBox>
                    {/* {this.state.allPosts.note.map((note) => (
                      <div key={note.content}></div>
                    ))} */}
                  </NoteBox>
                </ContentPostStyled>


                <FormCard onSubmit={this.uploadHandler}>
                  <FormGroup>
                    <FormLabel htmlFor="content">
                    </FormLabel>
                    <FormInput
                      type="text"
                      value={this.state.content}
                      placeholder="Écrire un commentaire ..."
                      onChange={this.onChangeContent}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ButtonStyled disabled={this.state.loading}>
                      {this.state.loading && <span className=""></span>}
                      Envoyer
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

//_-----------------------------------------------------------

// import React, { Component } from "react";
// import AuthService from "../services/auth.service";
// import postService from "../services/post.service";
// import noteService from "../services/note.service";
// import "../App.css";
// import Logo from "../assets/icon-left-font-monochrome-white.png";
// import axios from "axios";
// import styled from "styled-components";

// const PageWrapper = styled.div`
//   z-index: 0;
//   display: flex;
//   justify-content: center;
//   background-color: white;
//   opacity: 0.97;
//   height: 100%;
//   margin: 1rem;
//   border-radius: 1rem;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   background-color: rgb(237, 232, 232);
//   border-radius: 1rem;
//   height: 100%;
//   padding: 2rem;
//   transition: all 0.4s ease-in-out;
//   margin: 1rem;
//   box-shadow: 0px 0px 20px -10px black;
// `;

// const PostContainerStyled = styled.div`

// `
// let noteCounter = 1;

// class Forum extends Component {
//   constructor(props) {
//     postService.getAllPosts();
//     noteService.getAllNotes();

//     let posts = JSON.parse(localStorage.getItem("posts"));
//     let notes = JSON.parse(localStorage.getItem("notes"));

//     this.setAllPosts = this.setAllPosts.bind(this);

//     super(props);
//     this.deletePostById = this.deletePostById.bind(this);
//     this.deleteNoteById = this.deleteNoteById.bind(this);
//     this.state = {
//       content: "",
//       user_id: "",

//       postValue: "",
//       noteValue: "",

//       allPosts: posts,
//       allNotes: notes,

//       noteValue: "",
//       noteInput: [{ noteId:"", text: "", }],
//     };
//   }

//   handleNoteValue = (e) => {
//     this.setState({
//       noteValue: e.target.value,
//     });
//   };

//   setNoteInput = () => {
//     this.setState({
//       noteInput: [
//         ...this.state.noteInput,
//         { noteId: noteCounter++, text: this.state.noteValue },
//       ],
//       noteValue: "",
//     });
//   };

//   submitNoteInput = () => {
//     // e.preventDefault();
//     this.submitNoteInput();
//   };

//   deletePostById(e) {
//     e.preventDefault();
//     console.log(e.target.id);
//     axios.delete(`http://127.0.0.1:8080/posts/${e.target.id}`).then(() => {
//       window.location.reload();
//     });
//   }

//   deleteNoteById(e) {
//     e.preventDefault();
//     axios.delete(`http://127.0.0.1:8080/notes/${e.target.id}`).then(() => {
//       window.location.reload();
//     });
//   }

//   setAllPosts(e) {
//       this.setState({ postValue: e.target.value });
//   }

//   deletePost(e) {
//       e.preventDefault();
//       axios
//         .delete(
//           `http://127.0.0.1:8080/posts/${this.state.postId}`,
//           { headers: AuthHeader() }
//         )
//         .then(() => {
//           this.props.history.push("/forum");
//           window.location.reload();
//           this.setState({ postValue: false });
//         });
//   }

//   deleteNote(e) {
//       e.preventDefault();
//       axios
//         .delete(
//           `http://127.0.0.1:8080/notes/${this.state.noteId}`,
//           { headers: AuthHeader() }
//         )
//         .then(() => {
//           this.props.history.push("/forum");
//           window.location.reload();
//           this.setState({ noteValue: false });
//         });
//   }

//   render() {
//     return (
//       <PageWrapper>
//         <Container>
//           <div className="postBox">
//             <img className="LogoForum" src={Logo} alt="Logo Groupomania" />
//             <div>
//               {this.state.allPosts.map((post) => (
//                 <div className="postContainer" key={post.content}>
//                   <div>
//                     <bouton onClick={this.deletePostById} id={post.id}>
//                       Supprimer
//                     </bouton>
//                     <span className="userIdPost">{`${post.user_id}`}</span>
//                     <h2 className="titlePost">{`${post.title}`}</h2>
//                   </div>
//                   <img
//                     className="attachmentPost"
//                     src={`${post.attachment}`}
//                     alt=""
//                   />
//                   <div className="contentPost">{`${post.content}`}</div>
//                 </div>
//               ))}
//               <button onClick={this.deletePost}>Supprimer</button>
//             </div>

//             {this.state.allPosts.map((note) => (
//               <div className="noteContainer" key={note.content}>
//                 <div>
//                   <bouton onClick={this.deleteNoteById} id={note.id}>
//                     Supprimer
//                   </bouton>
//                   <span className="userIdNote">{`${note.user_id}`}</span>
//                   <h2 className="titlePost">{`${note.title}`}</h2>
//                   <h2 className="contentNote">{`${note.content}`}</h2>
//                 </div>
//               </div>
//             ))}

//             {/* <div className="noteBox">

//               <span className="username"></span>
//                 <label htmlFor="noteArea"></label>

//                 <div className="handleNote">
//                     <textarea className="noteInput" type="text" placeholder="Écris un commentaire..."></textarea>
//                     <button>Envoyer</button>
//                 </div>

//               <div className="allNotes">
//                 <span>ici s'affiches les commentaires</span>
//                 <button onClick={this.deleteNote}>Supprimer</button>
//               </div>

//             </div>

//             <div className="allNotes">
//                 <span>ici s'affiches les commentaires</span>
//                 <button onClick={this.deleteNote}>Supprimer</button>
//             </div> */}
//           </div>
//         </Container>
//       </PageWrapper>
//     );
//   }
// }

// export default Forum;
