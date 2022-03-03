import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import AuthHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import styled from "styled-components"; 
import { Link } from "react-router-dom";
import NoteBox from "./NoteBox";
import PostBox from "./PostBox";

const PageWrapper = styled.div`
  z-index: 0;
  display: flex;
  justify-content: center;
  background-color: white;
  opacity: 0.97;
  height: 100%;
  margin: 1rem;
  border-radius: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(237, 232, 232);
  border-radius: 1rem;
  height: 100%;
  padding: 2rem;
  transition: all 0.4s ease-in-out;
  margin: 1rem;
  box-shadow: 0px 0px 20px -10px black;
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 20rem;
`;

const CardTitle = styled.h2`
  font-size: 30px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  font-weight: 500;
  color: rgb(255, 87, 54);
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

class Forum extends Component {
  constructor(props) {
    super(props);
    this.handlePostValue = this.handlePostValue.bind(this);
    this.handleNoteValue = this.handleNoteValue.bind(this);

    this.uploadHandler = this.uploadHandler.bind(this);

    // this.getAllPosts = this.getAllPosts.bind(this);
    // this.getAllNotes = this.getAllNotes.bind(this);

    // this.deletePost = this.deletePost.bind(this);
    // this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      postValue: "",

      postId:"",
      noteId:"",

      noteValue: "",
      noteInput: [{ noteId:"", text: "", }],
    };

    handlePostValue = (e) => {
      this.setState({ postValue: e.target.value, })
    };
  
    handleNoteValue = (e) => {
      this.setState({ noteValue: e.target.value, })
    };
  
    setPostInput = () => {
      this.setState({
        postInput: [
         ...this.state.postInput,
         { postId: postCounter++, text: this.state.postValue }],
        postValue: "",
      });

    setNoteInput = () => {
      this.setState({
        noteInput: [
         ...this.state.noteInput,
         { noteId: noteCounter++, text: this.state.noteValue }],
        noteValue: "",
      });
    
      submitNoteInput = (e) => {
        e.preventDefault();
        this.setNoteInput();
      };
      enterNoteInput = (e) => {
        if (e.charCode === 13) {
         this.setNoteInput();
        }
      };
    

    deletePost(e) {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8080/posts/${this.state.postId}`, { headers: AuthHeader() } )
          .then(() => {
            AuthService.logout();
            this.props.history.push("/forum");
            window.location.reload();
            this.setState({ postValue: false });
    });
        

    deleteNote(e) {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8080/notes/${this.state.note_id}`, { headers: AuthHeader() } )
          .then(() => {
            AuthService.logout();
            this.props.history.push("/forum");
            window.location.reload();
            this.setState({ noteValue: false });
          })
    }


    uploadHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.selectedFile) {
          formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
          )
      

        if (this.state.content !== "") {
          formData.append("content", this.state.content);
        }

        formData.append("user_id", this.state.currentUser.data.userData.id)

    axios
      .put(
        "http://127.0.0.1:8080/notes/",
        formData,
        { headers: AuthHeader() }
      )
      .then((response) => {
        this.props.history.push("/forum");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }
    
  render(){

    return (
      <PageWrapper>
        <Container>
          <div className="postBox">
            <div className="post">
              <span>ici s'affiche la publication</span>
              <button>Modifier</button>
              <button onClick={this.deletePost}>Supprimer</button>
            </div>

                {/* <NoteBox noteValue ={ this.state.noteValue} 
                handleNoteValue ={ this.handleNoteValue} 
                submitNoteInput ={ this.submitNoteInput}>
                  
                </NoteBox>  */}
            
            <div className="noteBox">

              <span className="username"></span>
                <label htmlFor="noteArea"></label>

                <div className="handleNote">
                    <input className="noteInput" type="text" placeholder="Écris un commentaire..." />
                    <button>Envoyer</button>
                </div>

              <div className="allNotes">
                <span>ici s'affiches les commentaires</span>
                <button onClick={this.deleteNote}>Supprimer</button>
              </div>

            </div>
          </div>
        </Container>
      </PageWrapper>
    );
  }
}

export default Forum