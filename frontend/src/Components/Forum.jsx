import React, { Component } from "react";
// import { useState } from "react";
import axios from "axios";
import AuthHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import styled from "styled-components"; 
import { Link } from "react-router-dom";
import NoteBox from './NoteBox'

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

// const FormCard = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   min-width: 20rem;
// `;

// const CardTitle = styled.h2`
//   font-size: 30px;
//   margin-top: 2rem;
//   margin-bottom: 2rem;
//   display: flex;
//   justify-content: center;
//   font-weight: 500;
//   color: rgb(255, 87, 54);
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 3px;
// `;
// const FormLabel = styled.label`
//   font-size: 14px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   color: rgb(13, 32, 89);
//   text-decoration: none;
//   margin: 0;
// `;

// const FormInput = styled.input`
//   z-index: 1;
//   opacity: 1;
//   border: none;
//   padding: 10px;
//   border-radius: 4px;
// `;

// const StyledButton = styled.button`
//   cursor: pointer;
//   border: none;
//   border-radius: 4px;
//   padding: 10px;
//   font-size: 16px;
//   background-color: #ff5736;
//   color: white;
//   width: 100%;
// `;

let noteCounter = 1;

class Forum extends Component {
    constructor(props) {

        // this.deletePost = this.deletePost.bind(this);
        // this.deleteNote = this.deleteNote.bind(this);

        // this.setAllPosts = this.setAllPosts.bind(this);

        super(props);
        this.state = {

            content: "",
            user_id: "",

            postValue: "",

            noteValue: "",
            noteInput: [{ noteId:"", text: "", }],
        };
    }

    handleNoteValue = (e) => {
        this.setState({
            noteValue: e.target.value,
        });
    };

    setNoteInput = () => {
        this.setState({
            noteInput: [
            ...this.state.noteInput,
            { noteId: noteCounter++, text: this.state.noteValue }],
            noteValue: "",
        })
    }

    submitNoteInput = () => {
        // e.preventDefault();
        this.submitNoteInput();
    };

    // setAllPosts(e) {
    //     this.setState({ postValue: e.target.value });
    // }

    // deletePost(e) {
    //     e.preventDefault();
    //     axios
    //       .delete(
    //         `http://127.0.0.1:8080/posts/${this.state.postId}`,
    //         { headers: AuthHeader() }
    //       )
    //       .then(() => {
    //         this.props.history.push("/forum");
    //         window.location.reload();
    //         this.setState({ postValue: false });
    //       });
    // }

    // deleteNote(e) {
    //     e.preventDefault();
    //     axios
    //       .delete(
    //         `http://127.0.0.1:8080/notes/${this.state.noteId}`,
    //         { headers: AuthHeader() }
    //       )
    //       .then(() => {
    //         this.props.history.push("/forum");
    //         window.location.reload();
    //         this.setState({ noteValue: false });
    //       });
    // }

    render() {
      return (
    <PageWrapper>
        <Container>
          <div className="postBox">
            <div className="post">
              <span>ici s'affiche la publication</span>
              <button onClick={this.deletePost}>Supprimer</button>
            </div>

                <NoteBox noteValue ={ this.state.noteValue} 
                    handleNoteValue ={ this.handleNoteValue} 
                    submitNoteInput ={ this.submitNoteInput}>
                  
                </NoteBox> 
            
            {/* <div className="noteBox">

              <span className="username"></span>
                <label htmlFor="noteArea"></label>

                <div className="handleNote">
                    <textarea className="noteInput" type="text" placeholder="Écris un commentaire..."></textarea>
                    <button>Envoyer</button>
                </div>

              <div className="allNotes">
                <span>ici s'affiches les commentaires</span>
                <button onClick={this.deleteNote}>Supprimer</button>
              </div>

            </div> */}

            <div className="allNotes">
                <span>ici s'affiches les commentaires</span>
                <button onClick={this.deleteNote}>Supprimer</button>
            </div>


          </div>
        </Container>
      </PageWrapper>
      );
    }
  }
  
  export default Forum;